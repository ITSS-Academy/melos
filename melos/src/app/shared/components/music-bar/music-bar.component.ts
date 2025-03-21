import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
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
import { MusicTabComponent } from '../music-tab/music-tab.component';
import { AuthModel } from '../../../models/auth.model';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { RouterLink } from '@angular/router';
import { NgIf, NgStyle } from '@angular/common';
import * as HistoryActions from '../../../ngrx/history/history.actions';
import { LocalstoreSongService } from '../../../services/localstore-song/localstore.song.service';
import { LikeState } from '../../../ngrx/like/like.state';
import { QueueState } from '../../../ngrx/queue/queue.state';
import * as QueueActions from '../../../ngrx/queue/queue.actions';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [MaterialModule, MusicTabComponent, RouterLink, NgIf, NgStyle],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.scss',
})
export class MusicBarComponent implements OnInit, OnDestroy {
  currentSong: SongModel | null = null;
  hlsUrl: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 50;
  subscriptions: Subscription[] = [];
  Queuesubscriptions: Subscription[] = [];
  saveVolume = this.volume;
  uid!: string;

  songListsQueue: SongModel[] = [];
  songListsQueue$!: Observable<SongModel[]>;

  likeList$!: Observable<string[]>;
  likeList: string[] = [];

  isCreateSuccess$!: Observable<boolean>;
  isRemoveSuccess$!: Observable<boolean>;

  hasUpdatedViews = false;
  play$!: Observable<boolean>;

  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  isLoaded = false;
  isLoop = false;
  isRandom = false;

  overlayOpen = false;
  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;
  section: HTMLElement | null = null;
  constructor(
    private songService: SongService,
    private snackBarService: SnackbarService,
    private store: Store<{
      song: SongState;
      play: PlayState;
      auth: AuthState;
      like: LikeState;
      queue: QueueState;
    }>,
    private renderer: Renderer2,
    private localStoreSongService: LocalstoreSongService,
  ) {
    this.songListsQueue$ = this.store.select('song', 'songQueue');
    this.play$ = this.store.select('play', 'isPlaying');
    this.auth$ = this.store.select('auth', 'authData');
    this.likeList$ = this.store.select('like', 'songIdLikes');
    this.isCreateSuccess$ = this.store.select('queue', 'isCreateSuccess');
    this.isRemoveSuccess$ = this.store.select('queue', 'isRemoveSuccess');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth$.subscribe((auth) => {
        if (auth?.idToken && auth.uid) {
          this.authData = auth;
          this.uid = auth.uid;
        }
      }),
      this.songService.currentSong$.subscribe((song) => {
        this.currentSong = song;
        if (song) {
          this.hlsUrl = `https://fribhpcpiubpvmuhgadg.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
          this.hasUpdatedViews = false;

          this.setupHls();
        }
      }),
      this.play$.subscribe((isPlaying) => {
        if (isPlaying) {
          this.audioPlayer.nativeElement.play();
          this.isPlaying = isPlaying;
        } else {
          this.audioPlayer.nativeElement.pause();
          this.isPlaying = isPlaying;
        }
      }),
      this.songListsQueue$.subscribe((songLists) => {
        if (songLists.length > 0 || songLists != this.songListsQueue) {
          this.songListsQueue = songLists;
        }
      }),
      this.likeList$.subscribe((likeList) => {
        if (likeList.length > 0) {
          this.likeList = likeList;
        }
      }),

      this.isCreateSuccess$.subscribe((isCreateSuccess) => {
        if (isCreateSuccess) {
          this.snackBarService.showAlert(
            'Add song to queue successfully',
            'Close',
          );
          this.clickGetQueue();
          this.store.dispatch(QueueActions.clearStateCreateQueueSuccess());
        }
      }),

      this.isRemoveSuccess$.subscribe((isRemoveSuccess) => {
        if (isRemoveSuccess) {
          this.clickGetQueue();
          this.store.dispatch(QueueActions.clearStateRemoveQueueSuccess());
        }
      }),
    );

    const savedSong = this.localStoreSongService.getSong();
    if (savedSong && SongActions.getSongById({ id: savedSong.id })) {
      this.songService.setCurrentSong(savedSong);
    }
    this.section = document.getElementById('next-song-section');
    this.updateChangeVolume();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  clickGetQueue() {
    this.store.dispatch(
      SongActions.getSongQueue({
        uid: this.uid,
        idToken: this.authData?.idToken ?? '',
      }),
    );
    // this.Queuesubscriptions.push(
    //   this.songListsQueue$.subscribe((songLists) => {
    //     if (songLists.length > 0 || songLists != this.songListsQueue) {
    //       this.songListsQueue = songLists;
    //     }
    //   }),
    // );
  }

  setupHls(): void {
    const audio = this.audioPlayer.nativeElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.hlsUrl!);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (!this.isLoaded) {
          audio.play().then((r) => this.store.dispatch(PlayActions.pause()));
          this.isLoaded = true;
        } else {
          audio.play().then((r) => this.store.dispatch(PlayActions.play()));
        }
      });
    } else {
      audio.src = this.hlsUrl!;
      audio.preload = 'auto';

      audio.play().then((r) => this.store.dispatch(PlayActions.play()));
    }
    // Cập nhật tiến trình
    audio.ontimeupdate = () => {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 1;

      this.updateProgressBar(); // Gọi hàm cập nhật thanh tiến trình
      if (this.currentTime >= this.duration) {
        if (!this.isLoop && !this.isRandom) {
          this.playNextSong();
        }
      }
      if (Math.floor(this.currentTime) === 10 && !this.hasUpdatedViews) {
        this.updateViews();
        this.hasUpdatedViews = true;
      }
    };

    // Cập nhật trạng thái play/pause
    audio.onplay = () => this.store.dispatch(PlayActions.play());
    audio.onpause = () => this.store.dispatch(PlayActions.pause());
  }

  playNextSong() {
    const currentIndex = this.songListsQueue.findIndex(
      (song) => song.id === this.currentSong?.id,
    );
    const nextIndex = (currentIndex + 1) % this.songListsQueue.length;
    const nextSong = this.songListsQueue[nextIndex];
    if (nextSong) {
      this.songService.setCurrentSong(nextSong);
    }
  }

  loopClick() {
    this.isLoop = !this.isLoop;
    if (this.isLoop) {
      this.loopSong();
    } else {
      this.noLoopSong();
    }
  }

  noLoopSong() {
    if (this.audioPlayer.nativeElement.loop) {
      this.audioPlayer.nativeElement.loop = false;
    }
  }

  loopSong() {
    if (!this.audioPlayer.nativeElement.loop) {
      this.audioPlayer.nativeElement.loop = true;
    }
  }

  //Cập nhật thanh có màu theo thời gian bài hát chạy
  updateProgressBar() {
    const progress = (this.currentTime / this.duration) * 100;
    const progressBar = document.querySelector(
      '.progress-bar',
    ) as HTMLInputElement;
    if (progressBar) {
      // progressBar.style.background = `linear-gradient(to right, #2196F3 ${progress}%, #ccc ${progress}%)`;
      progressBar.style.setProperty('--progress', `${progress}%`);
    }
  }

  public togglePlayPause() {
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
      this.store.dispatch(
        SongActions.updateSongViews({ id: this.currentSong.id }),
      );

      this.store.dispatch(
        HistoryActions.createHistory({
          songId: this.currentSong.id,
          uid: this.uid,
          idToken: this.authData?.idToken ?? '',
        }),
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
    let unmuteBtn = document.getElementById('vol-unmute-contain');
    let muteBtn = document.getElementById('vol-mute-contain');
    if (this.volume <= 0) {
      this.renderer.setStyle(muteBtn, 'display', 'flex');
      this.renderer.setStyle(unmuteBtn, 'display', 'none');
    } else {
      this.renderer.setStyle(unmuteBtn, 'display', 'flex');
      this.renderer.setStyle(muteBtn, 'display', 'none');
    }
    this.updateChangeVolume();
  }

  updateChangeVolume() {
    const volumeBar = document.querySelector('.volume-bar') as HTMLInputElement;
    if (volumeBar) {
      const volume = this.volume || 50; // Giả sử mặc định là 50%
      volumeBar.style.setProperty('--volume', `${volume}%`);
    }
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
      this.Queuesubscriptions.forEach((subscription) =>
        subscription.unsubscribe(),
      );
      this.store.dispatch(SongActions.clearStateQueue());
    } else {
      this.overlayOn();
      this.overlayOpen = true;
      this.clickGetQueue();
    }
  }

  overlayOn() {
    if (this.section) {
      this.renderer.setStyle(this.section, 'display', 'block');
    }
  }
  overlayOff() {
    if (this.section) {
      this.renderer.setStyle(this.section, 'display', 'none');
    }
  }

  //Mute and Unmute song

  clickMute() {
    this.saveVolume = this.volume;
    const audio = this.audioPlayer.nativeElement;
    audio.volume = 0;
    this.volume = 0.1;
    let unmuteBtn = document.getElementById('vol-unmute-contain');
    let muteBtn = document.getElementById('vol-mute-contain');
    if (unmuteBtn || muteBtn) {
      this.renderer.setStyle(unmuteBtn, 'display', 'none');
      this.renderer.setStyle(muteBtn, 'display', 'flex');
    }
    this.updateChangeVolume();
  }
  clickUnmute() {
    const audio = this.audioPlayer.nativeElement;
    this.volume = this.saveVolume;
    audio.volume = this.volume / 100;
    let unmuteBtn = document.getElementById('vol-unmute-contain');
    let muteBtn = document.getElementById('vol-mute-contain');
    if (muteBtn || unmuteBtn) {
      this.renderer.setStyle(unmuteBtn, 'display', 'flex');
      this.renderer.setStyle(muteBtn, 'display', 'none');
    }
    this.updateChangeVolume();
  }
}
