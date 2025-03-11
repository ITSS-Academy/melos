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

  constructor(
    private store: Store<{
      playlist: PlaylistState;
    }>,
  ) {
    this.playlist$ = this.store.select('playlist', 'playlistList');
    console.log('dialog add song playlist', this.data);
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
        if (playlist.length > 0) {
          this.playlist = playlist;
        }
      }),
    );
  }

  ngOnDestroy() {}
}
