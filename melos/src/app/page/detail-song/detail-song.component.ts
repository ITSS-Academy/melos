import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MaterialModule } from '../../shared/material.module';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';
import { Observable, Subject, Subscription } from 'rxjs';
import { SongModel } from '../../models/song.model';
import { SongState } from '../../ngrx/song/song.state';
import { Store } from '@ngrx/store';
import * as SongActions from '../../ngrx/song/song.actions';
import { ActivatedRoute, Router } from '@angular/router';
import * as PlayAction from '../../ngrx/play/play.actions';
import { SongService } from '../../services/song/song.service';
import { PlayState } from '../../ngrx/play/play.state';
import { CategoryState } from '../../ngrx/category/category.state';
import { IdToAvatarPipe } from '../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../shared/pipes/id-to-name.pipe';
import { ShareModule } from '../../shared/share.module';
import { FormControl } from '@angular/forms';
import * as CommentActions from '../../ngrx/comment/comment.actions';
import { CommentState } from '../../ngrx/comment/comment.state';
import { CommentModel } from '../../models/comment.model';
import * as SearchActions from '../../ngrx/search/search.actions';
import { AuthState } from '../../ngrx/auth/auth.state';
import { AuthModel } from '../../models/auth.model';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { LikeState } from '../../ngrx/like/like.state';
@Component({
  selector: 'app-detail-song',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MaterialModule,
    MusicTabComponent,
    IdToAvatarPipe,
    AsyncPipe,
    IdToNamePipe,
    ShareModule,
  ],
  templateUrl: './detail-song.component.html',
  styleUrl: './detail-song.component.scss',
})
export class DetailSongComponent implements OnInit, OnDestroy {
  isPlaying = false;
  isPlaying$!: Observable<boolean>;
  subscriptions: Subscription[] = [];
  songDetail!: SongModel;
  songDetail$!: Observable<SongModel>;
  mayLike: SongModel[] = [];
  mayLike$!: Observable<SongModel[]>;
  commentList$!: Observable<CommentModel[]>;
  commentList: CommentModel[] = [];
  commentSubject = new Subject<string>();
  auth$!: Observable<AuthModel | null>;
  authData!: AuthModel | null;
  formComment: CommentModel = <CommentModel>{};
  likeList$!: Observable<string[]>;
  likeList: string[] = [];

  constructor(
    private songService: SongService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackbarService,
    private router: Router,
    private store: Store<{
      song: SongState;
      play: PlayState;
      category: CategoryState;
      comment: CommentState;
      auth: AuthState;
      like: LikeState;
    }>,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.store.dispatch(SongActions.getSongById({ id: id }));
        this.store.dispatch(CommentActions.getCommentBySong({ songId: id }));
      }
    });
    this.songDetail$ = this.store.select('song', 'songDetail');
    this.isPlaying$ = this.store.select('play', 'isPlaying');
    this.mayLike$ = this.store.select('song', 'songCategories');
    this.auth$ = this.store.select('auth', 'authData');
    this.commentList$ = this.store.select('comment', 'commentList');
    this.likeList$ = this.store.select('like', 'songIdLikes');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.songDetail$.subscribe((songDetail) => {
        if (songDetail.id && songDetail.category_id) {
          this.songDetail = songDetail;
          this.store.dispatch(
            SongActions.getSongCategories({
              id: this.songDetail.category_id,
            }),
          );
        }
      }),
      this.isPlaying$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      }),
      this.mayLike$.subscribe((songLists) => {
        if (songLists.length > 0) {
          this.mayLike = songLists;
        }
      }),

      this.auth$.subscribe((auth) => {
        if (auth?.idToken && auth?.uid) {
          this.authData = auth;
        }
      }),

      this.commentList$.subscribe((commentList) => {
        this.commentList = commentList;
      }),
      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
        }
      }),
    );
  }

  isPlayingSong() {
    return (
      this.isPlaying &&
      this.songDetail?.id == this.songService.currentPlaySong?.id
    );
  }

  playSong() {
    if (this.isPlaying) {
      if (this.songDetail?.id == this.songService.currentPlaySong?.id) {
        this.store.dispatch(PlayAction.pause());
        return;
      } else {
        this.songService.setCurrentSong(this.songDetail);
        this.store.dispatch(PlayAction.play());
        return;
      }
    } else {
      if (this.songDetail?.id == this.songService.currentPlaySong?.id) {
        this.store.dispatch(PlayAction.play());
        return;
      } else {
        this.songService.setCurrentSong(this.songDetail);
        this.store.dispatch(PlayAction.play());
        return;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(CommentActions.clearStateComment());
    this.store.dispatch(SongActions.clearStateSongCategory());
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }

  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.commentSubject.next(query);
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    if (
      keyboardEvent.key === 'Enter' &&
      this.authData?.uid &&
      this.authData.idToken &&
      query !== ''
    ) {
      this.formComment = {
        content: query,
        song_id: this.songDetail.id,
        uid: this.authData.uid,
        id: '',
        created_at: new Date().toISOString(),
      };
      this.store.dispatch(
        CommentActions.createComment({
          comment: this.formComment,
          idToken: this.authData.idToken,
        }),
      );
    } else {
      this.snackBarService.showAlert('Please login to comment', 'Close');
    }
    inputElement.value = '';
  }

  navigateToProfile(uid: string) {
    this.router.navigate(['/profile', uid]);
  }
}
