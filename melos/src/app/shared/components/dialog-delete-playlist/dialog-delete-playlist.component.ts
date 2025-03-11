import {
  Component,
  inject,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PlaylistState } from '../../../ngrx/playlist/playlist.state';
import { Observable } from 'rxjs';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-dialog-delete-playlist',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, LoadingComponent],
  templateUrl: './dialog-delete-playlist.component.html',
  styleUrl: './dialog-delete-playlist.component.scss',
})
export class DialogDeletePlaylistComponent implements OnInit, OnDestroy {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DialogDeletePlaylistComponent>);
  isDeletedSuccess$!: Observable<boolean>;
  isLoading$!: Observable<boolean>;
  constructor(
    private router: Router,
    private store: Store<{
      playlist: PlaylistState;
    }>,
  ) {
    this.isDeletedSuccess$ = this.store.select('playlist', 'isDeletedSuccess');
    this.isLoading$ = this.store.select('playlist', 'isLoading');
  }

  ngOnInit() {
    this.isDeletedSuccess$.subscribe((isDeletedSuccess) => {
      if (isDeletedSuccess) {
        this.dialogRef.close(true);
        this.router.navigate(['playlist']);
      }
    });
  }

  ngOnDestroy() {
    this.store.dispatch(PlaylistActions.clearStatePlaylist());
    this.isDeletedSuccess$.subscribe().unsubscribe();
  }

  deletePlaylist() {
    if (this.data.playlist.id) {
      this.store.dispatch(
        PlaylistActions.deletePlaylistById({
          id: this.data.playlist.id,
          uid: this.data.auth.uid,
          idToken: this.data.auth.idToken,
        }),
      );
    }
  }
}
