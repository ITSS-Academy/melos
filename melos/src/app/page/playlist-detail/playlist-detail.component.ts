import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions';
import { Observable, Subscription } from 'rxjs';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletePlaylistComponent } from '../../shared/components/dialog-delete-playlist/dialog-delete-playlist.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AsyncPipe } from '@angular/common';
import * as SongActions from '../../ngrx/song/song.actions';
import { AuthState } from '../../ngrx/auth/auth.state';
import { AuthModel } from '../../models/auth.model';
import { SongState } from '../../ngrx/song/song.state';
import { SongModel } from '../../models/song.model';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [MaterialModule, LoadingComponent, AsyncPipe],
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
    private openDialogDelete: MatDialog,
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
        if (playlistDetail?.id) {
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
  }

  // openDialogCreatNewList(){
  //   this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
  //     width: '40vw',
  //     maxWidth:'none',
  //     data: {message: 'noi dung'}
  //   })
  // }

  openDialogEditList() {}
  // this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
  //   width: '40vw',
  //   maxWidth:'none',
  //   data: {message: 'noi dung'}
  // })
  openDialogDeletePlaylist() {
    this.openDialogDelete.open(DialogDeletePlaylistComponent, {
      width: '30vw',
      maxWidth: 'none',
      data: { message: 'Would you like to delete this playlist' },
    });
  }
}
