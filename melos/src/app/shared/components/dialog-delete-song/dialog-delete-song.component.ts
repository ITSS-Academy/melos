import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import * as SongActions from '../../../ngrx/song/song.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialog-delete-song',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './dialog-delete-song.component.html',
  styleUrl: './dialog-delete-song.component.scss',
})
export class DialogDeleteSongComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogDeleteSongComponent>);
  constructor(private store: Store) {}

  deleteSongFromPlaylist() {
    if (this.data.auth.uid) {
      this.store.dispatch(
        SongActions.deleteSongFromPlaylist({
          playlistId: this.data.playlistId,
          songId: this.data.song.id,
          uid: this.data.auth.uid,
          idToken: this.data.auth.idToken,
        }),
      );
    }

    this.dialogRef.close();
  }
}
