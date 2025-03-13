import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions';
import { combineLatest, Observable, Subscription, take } from 'rxjs';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletePlaylistComponent } from '../../shared/components/dialog-delete-playlist/dialog-delete-playlist.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AsyncPipe, NgIf, Location } from '@angular/common';
import * as SongActions from '../../ngrx/song/song.actions';
import { AuthState } from '../../ngrx/auth/auth.state';
import { AuthModel } from '../../models/auth.model';
import { SongState } from '../../ngrx/song/song.state';
import { SongModel } from '../../models/song.model';
import { DialogEditPlaylistComponent } from '../../shared/components/dialog-edit-playlist/dialog-edit-playlist.component';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { map } from 'rxjs/operators';
import { SongService } from '../../services/song/song.service';
import * as PlayActions from '../../ngrx/playlist/playlist.actions';
import { PlayState } from '../../ngrx/play/play.state';
import * as PlayAction from '../../ngrx/play/play.actions';
import { LikeState } from '../../ngrx/like/like.state';
import { QueueState } from '../../ngrx/queue/queue.state';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [
    MaterialModule,
    LoadingComponent,
    AsyncPipe,
    MusicTabComponent,
    NgIf,
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent implements OnInit, OnDestroy {
  playlistDetail$!: Observable<PlaylistModel>;
  playlistDetail: PlaylistModel = {} as PlaylistModel;

  subscription: Subscription[] = [];

  isPlaylistDetailLoading$!: Observable<boolean>;

  auth$!: Observable<AuthModel | null>;
  authData!: AuthModel;

  playlistId!: string;

  songPlaylist$!: Observable<SongModel[]>;
  songPlaylist: SongModel[] = [];

  isPlaying: boolean = false;

  isPlaying$!: Observable<boolean>;
  likeList$!: Observable<string[]>;
  likeList: string[] = [];

  songQueueRandom$!: Observable<SongModel>;
  songQueueRandom!: SongModel;

  constructor(
    private location: Location,
    private openDialogDelete: MatDialog,
    private snackBarService: SnackbarService,
    private songService: SongService,
    private store: Store<{
      playlist: PlaylistState;
      auth: AuthState;
      song: SongState;
      play: PlayState;
      like: LikeState;
      queue: QueueState;
    }>,
    private activeRoute: ActivatedRoute,
  ) {
    this.playlistDetail$ = this.store.select('playlist', 'playlistDetail');
    this.isPlaylistDetailLoading$ = this.store.select(
      'playlist',
      'isLoadingDetail',
    );
    this.auth$ = this.store.select('auth', 'authData');
    this.songPlaylist$ = this.store.select('song', 'songPlaylist');
    this.isPlaying$ = this.store.select('play', 'isPlaying');
    this.likeList$ = this.store.select('like', 'songIdLikes');
    this.songQueueRandom$ = this.store.select('queue', 'songQueueRandom');
  }

  ngOnInit() {
    this.subscription.push(
      this.activeRoute.params.subscribe((params) => {
        this.playlistId = params['id'];
      }),

      this.isPlaying$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      }),

      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
        }
      }),

      this.songQueueRandom$.subscribe((songQueueRandom) => {
        if (songQueueRandom.id) {
          this.songService.setCurrentSong(songQueueRandom);
          this.store.dispatch(QueueActions.clearStateAddQueueRandomSuccess());
        }
      }),

      this.auth$.subscribe((auth) => {
        if (auth?.uid && auth.idToken) {
          this.authData = auth;
          this.store.dispatch(
            PlaylistActions.getPlaylistById({ id: this.playlistId }),
          );
          this.store.dispatch(
            SongActions.getSongByPlaylist({
              playlistId: this.playlistId,
              idToken: auth.idToken,
            }),
          );
        }
      }),

      this.playlistDetail$.subscribe((playlistDetail) => {
        if (playlistDetail.id) {
          this.playlistDetail = playlistDetail;
        }
      }),

      this.songPlaylist$.subscribe((playlistPlaylist) => {
        if (
          playlistPlaylist.length > 0 ||
          playlistPlaylist != this.songPlaylist
        ) {
          this.songPlaylist = playlistPlaylist;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearStatePlaylistDetail());
    this.store.dispatch(SongActions.clearStateSongPlaylist());
  }
  editDialogPlaylist() {
    const dialogRef = this.openDialogDelete.open(DialogEditPlaylistComponent, {
      width: '40vw',
      maxWidth: 'none',
      data: {
        description: this.playlistDetail?.description,
        img: this.playlistDetail?.image_url,
        name: this.playlistDetail?.name || 'Unknown Playlist',
        playlist: this.playlistDetail,
      },
    });
  }

  openDialogDeletePlaylist() {
    const dialogRef = this.openDialogDelete.open(
      DialogDeletePlaylistComponent,
      {
        width: '30vw',
        maxWidth: 'none',
        data: {
          message: 'Would you like to delete this playlist?',
          playlist: this.playlistDetail,
          auth: this.authData,
        },
      },
    );
  }

  playSongInPlaylist() {
    if (this.authData.idToken && this.playlistDetail.id) {
      this.store.dispatch(
        QueueActions.createQueueWithPlaylist({
          playlistId: this.playlistDetail.id,
          idToken: this.authData.idToken,
        }),
      );

      this.songService.setCurrentSong(this.songPlaylist[0]);
    } else {
      this.snackBarService.showAlert(
        'Please login to play this playlist',
        'Close',
      );
    }
  }

  playSongInPlaylistRandom() {
    if (this.authData.idToken && this.playlistDetail.id) {
      this.store.dispatch(
        QueueActions.createQueueWithPlaylistRandom({
          playlistId: this.playlistDetail.id,
          idToken: this.authData.idToken,
        }),
      );
    } else {
      this.snackBarService.showAlert(
        'Please login to play this playlist',
        'Close',
      );
    }
  }

  isPlayingSong() {
    return (
      this.isPlaying &&
      this.playlistDetail.songs_id.includes(this.songService.currentPlaySong.id)
    );
  }

  clickBack() {
    this.location.back();
  }

  playSong() {
    if (this.isPlaying) {
      if (
        this.playlistDetail.songs_id.includes(
          this.songService.currentPlaySong.id,
        )
      ) {
        this.store.dispatch(PlayAction.pause());
        return;
      } else {
        this.songService.setCurrentSong(this.songPlaylist[0]);
        this.store.dispatch(PlayAction.play());
        this.playSongInPlaylist();
        return;
      }
    } else {
      if (
        this.playlistDetail.songs_id.includes(
          this.songService.currentPlaySong.id,
        )
      ) {
        this.store.dispatch(PlayAction.play());
        this.playSongInPlaylist();

        return;
      } else {
        this.songService.setCurrentSong(this.songPlaylist[0]);
        this.store.dispatch(PlayAction.play());
        this.playSongInPlaylist();

        return;
      }
    }
  }
}
