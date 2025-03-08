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
import {AsyncPipe, NgStyle} from '@angular/common';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import {QueueModel} from "../../../models/queue.model";
import * as QueueActions from "../../../ngrx/queue/queue.actions";
import {QueueState} from "../../../ngrx/queue/queue.state";
import * as SongActions from "../../../ngrx/song/song.actions";
@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [MaterialModule, RouterLink, NgStyle],
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
  uid!: string ;

  addQueue$!: Observable<QueueModel| null>;
  addQueue!: QueueModel | null;

  removeQueue$!: Observable<QueueModel| null>;
  removeQueue!: QueueModel | null;

  private subscription: Subscription[] = [];
  constructor(
    private songService: SongService,
    private snackbarService: SnackbarService,
    private store: Store<{
      song: SongState;
      play: PlayState;
      like: LikeState;
      auth: AuthState;
      queue: QueueState;
    }>,
  ) {
    this.isPlaying$ = this.store.select('play', 'isPlaying');
    this.likeList$ = this.store.select('like', 'songIdLikes');
    // this.isLoadingLike$ = this.store.select('like', 'isLoading');
    this.auth$ = this.store.select('auth', 'authData');
    this.addQueue$ = this.store.select('queue', 'songsQueue');
    this.removeQueue$ = this.store.select('queue', 'songsQueue');
  }
  ngOnInit() {
    this.subscription.push(
      this.isPlaying$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      }),
      this.auth$.subscribe((authData) => {
        if (authData?.idToken && authData.uid) {
          this.authData = authData;
          this.uid = authData.uid;
        }
      }),
        this.addQueue$.subscribe((queueSong) => {
          this.addQueue = queueSong;
        }),
        this.removeQueue$.subscribe((queueSong) => {
          this.removeQueue = queueSong;
        }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  @Input() song?: SongModel;
  @Input() isLike?: boolean;
  @Input() isQueue?: boolean;

  isPlayingQueue() {
    return this.song?.id == this.songService.currentPlaySong?.id
  }

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

  async addQueueSong() {
    if (this.song) {
      this.store.dispatch(QueueActions.addToSongQueue({
        idToken: this.authData?.idToken ?? '',
        queue: {
            uid: this.uid,
            song_id: this.song.id,
            },
        }));
      this.store.dispatch(SongActions.getSongQueue({
        uid: this.uid,
        idToken: this.authData?.idToken ?? ''
      }));
    }
  }
  async removeQueueSong() {
    if (this.song) {
      this.store.dispatch(
          QueueActions.removeSongQueue({
            idToken: this.authData?.idToken ?? '',
            queue : {
              song_id: this.song.id,
              uid: this.uid,
            }
          }))};
    this.store.dispatch(SongActions.getSongQueue({
      uid: this.uid,
      idToken: this.authData?.idToken ?? ''
    }));
  }

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
