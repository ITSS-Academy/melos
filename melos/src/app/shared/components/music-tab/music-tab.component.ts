import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SongService } from '../../../services/song/song.service';
import { SongModel } from '../../../models/song.model';
import { Observable, Subscription } from 'rxjs';
import * as PlayAction from '../../../ngrx/play/play.actions';
import { Store } from '@ngrx/store';
import { SongState } from '../../../ngrx/song/song.state';
import { PlayState } from '../../../ngrx/play/play.state';
import { LikeState } from '../../../ngrx/like/like.state';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { AuthModel } from '../../../models/auth.model';
import * as LikeActions from '../../../ngrx/like/like.actions';

@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss',
})
export class MusicTabComponent implements OnInit {
  isPlaying = false;
  isPlaying$!: Observable<boolean>;
  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  likeList$!: Observable<string[]>;
  likeList: string[] = [];
  private subscription: Subscription[] = [];
  constructor(
    private songService: SongService,
    private store: Store<{
      song: SongState;
      play: PlayState;
      like: LikeState;
      auth: AuthState;
    }>,
  ) {
    this.isPlaying$ = this.store.select('play', 'isPlaying');
    this.likeList$ = this.store.select('like', 'songIdLikes');
    this.auth$ = this.store.select('auth', 'authData');
  }
  ngOnInit() {
    this.subscription.push(
      this.isPlaying$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      }),
      this.auth$.subscribe((authData) => {
        if (authData?.idToken) {
          this.authData = authData;
        }
      }),
      this.likeList$.subscribe((likeList) => {
        if (likeList.length > 0 && likeList !== this.likeList) {
          this.likeList = likeList;
        }
      }),
    );
  }
  @Input() song?: SongModel;
  playSong() {
    if (
      this.isPlaying &&
      this.song?.id == this.songService.currentPlaySong?.id
    ) {
      this.store.dispatch(PlayAction.pause());
      return;
    } else {
      this.songService.setCurrentSong(this.song!);
      this.store.dispatch(PlayAction.play());
      return;
    }
  }

  likeSong(songId: string) {
    if (songId && this.authData?.uid && this.authData?.idToken) {
      console.log(songId);
      this.store.dispatch(
        LikeActions.likeSong({
          songId: songId,
          uid: this.authData?.uid,
          idToken: this.authData?.idToken,
        }),
      );
    }
  }
}
