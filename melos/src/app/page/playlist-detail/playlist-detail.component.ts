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
import { AsyncPipe, NgIf } from '@angular/common';
import * as SongActions from '../../ngrx/song/song.actions';
import { AuthState } from '../../ngrx/auth/auth.state';
import { AuthModel } from '../../models/auth.model';
import { SongState } from '../../ngrx/song/song.state';
import { SongModel } from '../../models/song.model';
import { Location } from '@angular/common';
import { DialogEditPlaylistComponent } from '../../shared/components/dialog-edit-playlist/dialog-edit-playlist.component';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';
import * as QueueActions from '../../ngrx/queue/queue.actions';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
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
  playlistDetail!: PlaylistModel;
  subscription: Subscription[] = [];
  isPlaylistDetailLoading$!: Observable<boolean>;
  auth$!: Observable<AuthModel | null>;
  authData!: AuthModel;
  playlistId!: string;
  songPlaylist$!: Observable<SongModel[]>;
  songPlaylist: SongModel[] = [];

  constructor(
    private location: Location,
    private openDialogDelete: MatDialog,
    private snackBarService: SnackbarService,
    private store: Store<{
      playlist: PlaylistState;
      auth: AuthState;
      song: SongState;
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
  }

  ngOnInit() {
    this.subscription.push(
      this.activeRoute.params.subscribe((params) => {
        this.playlistId = params['id'];
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
          console.log(playlistDetail);
        }
      }),

      this.songPlaylist$.subscribe((playlistPlaylist) => {
        if (playlistPlaylist.length > 0) {
          this.songPlaylist = playlistPlaylist;
          console.log('songPlaylist:', playlistPlaylist);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearStatePlaylistDetail());
    this.store.dispatch(SongActions.clearStateSongPlaylist());
  }
  editDialogDeletePlaylist() {
    const dialogRef = this.openDialogDelete.open(DialogEditPlaylistComponent, {
      width: '30vw',
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
}
