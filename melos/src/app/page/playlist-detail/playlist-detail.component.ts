import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions'
import { Observable} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {AsyncPipe} from '@angular/common';
import {MaterialModule} from '../../shared/material.module';
import {
  DialogCreateNewPlaylistComponent
} from '../../shared/components/dialog-create-new-playlist/dialog-create-new-playlist.component';
import {MatDialog} from '@angular/material/dialog';
import {
  DialogDeletePlaylistComponent
} from '../../shared/components/dialog-delete-playlist/dialog-delete-playlist.component';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent implements OnInit {

  playlistDetail$!: Observable<PlaylistModel | null>
  playlistDetail!: PlaylistModel | null


  constructor(
    private openDialogDelete: MatDialog,
    private store : Store<{playlist: PlaylistState}>,
    private activeRoute : ActivatedRoute,

  ) {

  }

  ngOnInit() {
    this.playlistDetail$ = this.store.select('playlist','playlistDetail')
    console.log('hiên thị infor',this.playlistDetail$)

    this.activeRoute.params.subscribe((params) => {
      const id = params['id']
      console.log('id cua playlist',id)

      this.store.dispatch(PlaylistActions.getPlaylistById({id: id}))
    })
  }
  // openDialogCreatNewList(){
  //   this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
  //     width: '40vw',
  //     maxWidth:'none',
  //     data: {message: 'noi dung'}
  //   })
  // }

  openDialogEditList(){

  }
  // this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
  //   width: '40vw',
  //   maxWidth:'none',
  //   data: {message: 'noi dung'}
  // })
  openDialogDeletePlaylist(){
    this.openDialogDelete.open(DialogDeletePlaylistComponent,{

      width: '30vw',
      maxWidth: 'none',
      data: {message: 'Would you like to delete this playlist'}
    })
  }

}
