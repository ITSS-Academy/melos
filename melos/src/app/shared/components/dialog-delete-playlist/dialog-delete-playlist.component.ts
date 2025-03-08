import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {Store} from '@ngrx/store';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';


@Component({
  selector: 'app-dialog-delete-playlist',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-delete-playlist.component.html',
  styleUrl: './dialog-delete-playlist.component.scss'
})
export class DialogDeletePlaylistComponent {

  @Input() id !: string
  constructor( private store: Store<{

  }>) {
  }
  DeletePlaylist(id : string){

  }

}
