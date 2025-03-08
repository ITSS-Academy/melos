import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PlaylistModel} from '../../../models/playlist.model';
import {MaterialModule} from '../../material.module';
import {DialogCreateNewPlaylistComponent} from '../dialog-create-new-playlist/dialog-create-new-playlist.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogDeletePlaylistComponent} from '../dialog-delete-playlist/dialog-delete-playlist.component';
import {Store} from '@ngrx/store';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions'

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [
    RouterLink,
    MaterialModule,
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: PlaylistModel;
  @Output() SelectedIdDelete = new EventEmitter<string>()
  @Output() SelectIdEdit = new EventEmitter<string>()

constructor( private  store: Store) {
}
  editPlaylist(){
    this.SelectIdEdit.emit(this.playlist.id)
  }
  deletePlaylist(){
    this.SelectedIdDelete.emit(this.playlist.id)
  }

}
