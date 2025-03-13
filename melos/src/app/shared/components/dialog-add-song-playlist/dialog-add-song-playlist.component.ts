import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaylistState } from '../../../ngrx/playlist/playlist.state';
import { Store } from '@ngrx/store';
import { PlaylistModel } from '../../../models/playlist.model';
import { Observable, Subscription } from 'rxjs';
import * as PlaylistAction from '../../../ngrx/playlist/playlist.actions';

@Component({
  selector: 'app-dialog-add-song-playlist',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-add-song-playlist.component.html',
  styleUrl: './dialog-add-song-playlist.component.scss',
})
export class DialogAddSongPlaylistComponent implements OnInit, OnDestroy {
  data = inject(MAT_DIALOG_DATA);
  playlist$!: Observable<PlaylistModel[]>;
  playlist: PlaylistModel[] = [];
  subscription: Subscription[] = [];
  isAddSongSuccess$!: Observable<boolean>;

  constructor(
    private store: Store<{
      playlist: PlaylistState;
    }>,
  ) {
    this.playlist$ = this.store.select('playlist', 'playlistList');
    this.isAddSongSuccess$ = this.store.select('playlist', 'isAddSongSuccess');
  }
  ngOnInit() {
    this.store.dispatch(
      PlaylistAction.getPlaylistByUserId({
        uid: this.data.auth.uid,
        idToken: this.data.auth.idToken,
      }),
    );
    this.subscription.push(
      this.playlist$.subscribe((playlist: PlaylistModel[]) => {
        if (playlist.length > 0 || playlist != this.playlist) {
          this.playlist = playlist;
        }
      }),
      this.isAddSongSuccess$.subscribe((isAddSongSuccess) => {
        if (isAddSongSuccess) {
          this.store.dispatch(
            PlaylistAction.getPlaylistByUserId({
              uid: this.data.auth.uid,
              idToken: this.data.auth.idToken,
            }),
          );
        }
      }),
    );
  }

  isSongInPlaylist(playlist: PlaylistModel): boolean {
    return playlist.songs_id.includes(this.data.songId);
  }

  addSongToPlaylist(playlistId: string) {
    if (playlistId) {
      this.store.dispatch(
        PlaylistAction.addSongToPlaylist({
          playlistId: playlistId,
          songId: this.data.songId,
          idToken: this.data.auth.idToken,
          uid: this.data.auth.uid,
        }),
      );
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
