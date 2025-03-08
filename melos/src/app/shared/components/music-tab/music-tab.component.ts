import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss',
})
export class MusicTabComponent implements OnInit, OnDestroy {
  isPlaying = false;
  isPlaying$!: Observable<boolean>;
  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  likeList$!: Observable<string[]>;
  // isLoadingLike$!: Observable<boolean>;

  private subscription: Subscription[] = [];
  constructor(
    private songService: SongService,
    private snackbarService: SnackbarService,
    private store: Store<{
      song: SongState;
      play: PlayState;
      like: LikeState;
      auth: AuthState;
    }>,
  ) {
    this.isPlaying$ = this.store.select('play', 'isPlaying');
    this.likeList$ = this.store.select('like', 'songIdLikes');
    // this.isLoadingLike$ = this.store.select('like', 'isLoading');
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
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  @Input() song?: SongModel;
  @Input() isLike?: boolean;

  isPlayingSong() {
    return (
      this.isPlaying && this.song?.id == this.songService.currentPlaySong?.id
    );
  }
  playSong() {
    if (this.isPlaying) {
      if (this.song?.id == this.songService.currentPlaySong?.id) {
        this.store.dispatch(PlayAction.pause());
        return;
      } else {
        this.songService.setCurrentSong(this.song!);
        this.store.dispatch(PlayAction.play());
        return;
      }
    } else {
      if (this.song?.id == this.songService.currentPlaySong?.id) {
        this.store.dispatch(PlayAction.play());
        return;
      } else {
        this.songService.setCurrentSong(this.song!);
        this.store.dispatch(PlayAction.play());
        return;
      }
    }
  }
  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  // async likeSong(songId: string) {
  //   if (songId && this.authData?.uid && this.authData?.idToken) {
  //     console.log(songId);
  //     this.store.dispatch(
  //       LikeActions.likeSong({
  //         songId: songId,
  //         uid: this.authData?.uid,
  //         idToken: this.authData?.idToken,
  //       }),
  //     );
  //   } else {
  //     this.snackbarService.showAlert(
  //       'Please login to like this song',
  //       'Close',
  //       3000,
  //       'right',
  //       'top',
  //     );
  //   }
  // }


  async likeSong(songId: string) {
    if (!songId || !this.authData?.uid || !this.authData?.idToken) {
      this.snackbarService.showAlert(
        'Please login to like this song',
        'Close',
        3000,
        'right',
        'top'
      );
      return;
    }

    if (this.isLike) {
      this.store.dispatch(
        LikeActions.deleteLike({
          songId: songId,
          uid: this.authData.uid,
          idToken: this.authData.idToken,
        })
      );
    } else {
      this.store.dispatch(
        LikeActions.likeSong({
          songId: songId,
          uid: this.authData.uid,
          idToken: this.authData.idToken,
        })
      );
    }
  }



}
