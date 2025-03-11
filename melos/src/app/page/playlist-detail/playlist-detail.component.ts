import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions';
import {combineLatest, Observable, Subscription, take} from 'rxjs';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import { MaterialModule } from '../../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletePlaylistComponent } from '../../shared/components/dialog-delete-playlist/dialog-delete-playlist.component';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AsyncPipe } from '@angular/common';
import {AuthModel} from '../../models/auth.model';
import {AuthState} from '../../ngrx/auth/auth.state';
import { Location } from '@angular/common';
import {DialogEditPlaylistComponent} from '../../shared/components/dialog-edit-playlist/dialog-edit-playlist.component';

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
  authData$!: Observable<AuthModel | null>;
  constructor(
    private location: Location,
    private openDialogDelete: MatDialog,
    private store: Store<{ playlist: PlaylistState , auth: AuthState}>,
    private activeRoute: ActivatedRoute,
  ) {
    this.playlistDetail$ = this.store.select('playlist', 'playlistDetail');
    this.isPlaylistDetailLoading$ = this.store.select(
      'playlist',
      'isLoadingDetail',
    );
    this.authData$ = this.store.select((state) => state.auth.authData);
  }

  ngOnInit() {
    this.subscription.push(
      this.activeRoute.params.subscribe((params) => {
        const id = params['id'];
        console.log('id cua playlist', id);

        this.store.dispatch(PlaylistActions.getPlaylistById({ id: id }));
      }),
      this.playlistDetail$.subscribe((playlistDetail) => {
        if (playlistDetail?.id) {
          this.playlistDetail = playlistDetail;
          console.log(playlistDetail);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PlaylistActions.clearStatePlaylistDetail());
  }
  editDialogDeletePlaylist(){
    const dialogRef = this.openDialogDelete.open(DialogEditPlaylistComponent, {
      width: '30vw',
      maxWidth: 'none',
      data: {
        message: 'Would you like to delete this playlist?',
        name: this.playlistDetail?.name || 'Unknown Playlist'
      },
    });
  }

  openDialogDeletePlaylist() {
    const dialogRef = this.openDialogDelete.open(DialogDeletePlaylistComponent, {
      width: '30vw',
      maxWidth: 'none',
      data: {
        message: 'Would you like to delete this playlist?',
        name: this.playlistDetail?.name || 'Unknown Playlist'
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm' && this.playlistDetail?.id) {
        this.authData$.pipe(take(1)).subscribe((authData) => {
          if (authData?.idToken && authData?.uid) {
            this.store.dispatch(
              PlaylistActions.deletePlaylistById({
                id: this.playlistDetail.id,
                uid: authData.uid,
                idToken: authData.idToken,
              })
            );
            // //Quay lại trang trước đó
            this.location.back();
            // //cách khác
            // this.router.navigate(['/playlists']);  // //Điều hướng đến danh sách Playlist
          }
        });
      }
    });
  }


}
