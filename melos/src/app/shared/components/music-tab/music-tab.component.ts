import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {SongService} from "../../../services/song/song.service";
import {SongModel} from "../../../models/song.model";
import {Observable, Subscription} from "rxjs";
import * as PlayAction from "../../../ngrx/play/play.actions";
import {Store} from "@ngrx/store";
import {SongState} from "../../../ngrx/song/song.state";
import {PlayState} from "../../../ngrx/play/play.state";

@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent implements OnInit {
  isPlaying = false;
  isPlaying$!: Observable<boolean>;
  private subscription: Subscription[] = [];
  constructor(private songService: SongService, private store: Store<{ song: SongState, play: PlayState }>) {
    this.isPlaying$ = this.store.select('play', 'isPlaying');
  }
  ngOnInit() {
    this.subscription.push(
        this.songService.currentSong$.subscribe((currentSong) =>
        {
          try {
            this.isPlaying = currentSong?.id == this.song.id;
          } catch (e) {
            console.log(e);
          }
        }),
        this.isPlaying$.subscribe((isPlaying) => {
          this.isPlaying = isPlaying;
        })
    )
  }
  @Input() song!:SongModel;
  playSong() {
    if (this.isPlaying && this.song.id == this.songService.currentPlaySong?.id) {
      console.log("Now Play: ",this.song.title);
      this.store.dispatch(PlayAction.pause());
      return;
    } else {
      console.log("Now Play: ",this.song.title);
      this.songService.setCurrentSong(this.song);
      this.store.dispatch(PlayAction.play());
      return;
    }
  }
}
