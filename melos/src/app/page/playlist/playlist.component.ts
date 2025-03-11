import { Component, OnInit } from '@angular/core';
import { PlaylistCardComponent } from '../../shared/components/playlist-card/playlist-card.component';
import { MaterialModule } from '../../shared/material.module'; // Import MaterialModul
import { DialogCreateNewPlaylistComponent } from '../../shared/components/dialog-create-new-playlist/dialog-create-new-playlist.component';
import { DialogDeletePlaylistComponent } from '../../shared/components/dialog-delete-playlist/dialog-delete-playlist.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { PlaylistModel } from '../../models/playlist.model';
import { PlaylistState } from '../../ngrx/playlist/playlist.state';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import { AuthModel } from '../../models/auth.model';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, PlaylistCardComponent, NgForOf, NgIf],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})
export class PlaylistComponent implements OnInit {
  playlists$!: Observable<PlaylistModel[]>;

  authData$!: Observable<AuthModel | null>;

  constructor(
    private deletePLaylist: MatDialog,
    private newPLaylist: MatDialog,
    private store: Store<{ playlist: PlaylistState; auth: AuthState }>,
  ) {
    this.playlists$ = this.store.select((state) => state.playlist.playlistList);
    this.authData$ = this.store.select((state) => state.auth.authData);
  }
  ngOnInit() {
    this.authData$.subscribe((authData) => {
      if (authData?.idToken && authData.uid) {
        this.store.dispatch(
          PlaylistActions.getPlaylistByUserId({
            idToken: authData.idToken,
            uid: authData.uid,
          }),
        );
      }
    });
  }

  openDialogCreatNewList() {
    this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
      width: '40vw',
      maxWidth: 'none',
      data: { message: 'noi dung' },
    });
  }

  openEditPlaylist(playlistId: string) {
    // this.store.dispatch(PlaylistActions.editPlaylistById({ id: playlistId }));
    console.log(playlistId);
  }

  openDialogDeletePlaylist(playlist: PlaylistModel) {
    console.log(playlist.id);
    const diabloDelete = this.deletePLaylist.open(
      DialogDeletePlaylistComponent,
      {
        width: '40vw',
        maxWidth: 'none',
        data: playlist,
      },
    );
    diabloDelete.afterClosed().subscribe((result) => {
      if (result) {
        // this.store.dispatch(
        //   PlaylistActions.deletePlaylistById({ id: playlist.id }),
        // );
      }
    });
  }
}
