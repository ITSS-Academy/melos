import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Hls from 'hls.js';

import { SongService } from '../../../services/song/song.service';
import { SongModel } from '../../../models/song.model';
import { MaterialModule } from '../../material.module';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { SongState } from '../../../ngrx/song/song.state';
import * as SongActions from '../../../ngrx/song/song.actions';
import { PlayState } from '../../../ngrx/play/play.state';
import * as PlayActions from '../../../ngrx/play/play.actions';
import { play } from '../../../ngrx/play/play.actions';
import {MusicTabComponent} from "../music-tab/music-tab.component";

@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [MaterialModule,MusicTabComponent],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.scss',
})
export class MusicBarComponent implements OnInit {
  currentSong: SongModel | null = null;
  hlsUrl: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 50;
  subscriptions: Subscription[] = [];

  hasUpdatedViews = false;
  play$!: Observable<boolean>;

  overlayOpen = false;
  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private songService: SongService,
    private store: Store<{
      song: SongState;
      play: PlayState;
    }>,
  ) {
    this.play$ = this.store.select('play', 'isPlaying');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.songService.currentSong$.subscribe((song) => {
        this.currentSong = song;
        if (song) {
          this.hlsUrl = `https://fribhpcpiubpvmuhgadg.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
          this.setupHls();
        }
      }),
      this.play$.subscribe((isPlaying) => {
        if (isPlaying) {
            this.audioPlayer.nativeElement.play();
          this.isPlaying = isPlaying;

        }else {
            this.audioPlayer.nativeElement.pause();
          this.isPlaying = isPlaying;

        }
      }),
    );
  }

  setupHls(): void {
    const audio = this.audioPlayer.nativeElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.hlsUrl!);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play().then((r) => this.store.dispatch(PlayActions.play()));
      });
    } else {
      audio.src = this.hlsUrl!;
      audio.preload = 'auto';
      audio.play().then((r) => this.store.dispatch(PlayActions.play()));
    }

    // Cập nhật tiến trình
    audio.ontimeupdate = () => {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 100;
      if (this.currentTime >= 10 && !this.hasUpdatedViews) {
        this.hasUpdatedViews = true;
        this.updateViews();
      }
    };

    // Cập nhật trạng thái play/pause
    audio.onplay = () => this.store.dispatch(PlayActions.play());
    audio.onpause = () => this.store.dispatch(PlayActions.pause());
  }

  togglePlayPause() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play().then((r) => this.store.dispatch(PlayActions.play()));
    } else {
      audio.pause();
      this.store.dispatch(PlayActions.pause());
    }
  }

  updateViews() {
    if (this.currentSong) {
      console.log('Updating views for song:', this.currentSong.id);
      this.store.dispatch(
        SongActions.updateSongViews({ id: this.currentSong.id }),
      );
    }
  }

  seekAudio(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = (event.target.value / this.duration) * audio.duration;
  }

  changeVolume(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.volume = event.target.value / 100;
    this.volume = event.target.value;
  }

  rewind() {
    this.audioPlayer.nativeElement.currentTime -= 10;
  }

  forward() {
    this.audioPlayer.nativeElement.currentTime += 10;
  }

  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  overlaySongList() {
    if (this.overlayOpen) {
      this.overlayOff();
      this.overlayOpen = false;
    } else {
      this.overlayOn();
      this.overlayOpen = true;
    }
  }

  overlayOn() {
    let section = document.getElementById('next-song-section')
    if (section) {
      section.style.display = "block"
    }
  }
  overlayOff() {
    let section = document.getElementById('next-song-section')
    if (section) {
      section.style.display = "none"
    }
  }
}
