import {Component, OnInit} from '@angular/core';
import { PlaylistCardComponent } from '../../shared/components/playlist-card/playlist-card.component';
import {MusicCardComponent} from '../../shared/components/music-card/music-card.component';
import { MaterialModule } from '../../shared/material.module'; // Import MaterialModul
import {DialogCreateNewPlaylistComponent} from '../../shared/components/dialog-create-new-playlist/dialog-create-new-playlist.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {PlaylistModel} from '../../models/playlist.model';
import {PlaylistState} from '../../ngrx/playlist/playlist.state';
import {AuthState} from '../../ngrx/auth/auth.state';
import {immediateProvider} from 'rxjs/internal/scheduler/immediateProvider';
import { Store } from  '@ngrx/store';
import {AuthModel} from '../../models/auth.model';
import * as PlaylistActions from '../../ngrx/playlist/playlist.actions'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';



@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, PlaylistCardComponent, NgForOf, NgIf],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss',
})

export class PlaylistComponent implements OnInit{
  playlists$ !: Observable<PlaylistModel[]>

  authData$ !:Observable<AuthModel | null>

  constructor(private newPLaylist: MatDialog, private store: Store<{ playlist: PlaylistState; auth: AuthState }>) {
    this.playlists$ = this.store.select((state) => state.playlist.playlistList)
    this.authData$ = this.store.select((state)=> state.auth.authData)
  }
  ngOnInit() {
    this.authData$.subscribe((authData) => {
      if(authData?.idToken && authData.uid){
        this.store.dispatch(PlaylistActions.getPlaylistByUserId({
          idToken: authData.idToken,
          uid:authData.uid
        }))
      }
    })

    this.playlists$.subscribe((playlists) => {
      if(playlists.length > 0){
        console.log(playlists)
      }
    });
  }

  openDialogCreatNewList(){
    this.newPLaylist.open(DialogCreateNewPlaylistComponent, {
      width: '40vw',
      maxWidth:'none',
      data: {message: 'noi dung'}
    })
  }

  // playlists = [
  //   {
  //     id: 1,
  //     name: 'Radio',
  //     img: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/5/6/8/5568d11517ab8e384132d7f1c9e9434e.jpg',
  //     comment: '',
  //     tag: '',
  //     category: 'Anison',
  //     singer_name: '',
  //   },
  //   {
  //     id: 2,
  //     name: 'Taylor Swift',
  //     img: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png',
  //     comment: '',
  //     tag: '',
  //     category: 'Country music',
  //     singer_name: 'Taylor Swift',
  //   },
  //   {
  //     id: 3,
  //
  //     name: 'Your playlist',
  //     img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQat97yEF4kAwu3VAg-y8CxpP4GUGAvZEIMOye1RQ7ICXElVlz_drAm8_xga1fNXHvr0GA&usqp=CAU',
  //     comment: '',
  //     tag: '',
  //     category: 'Country music',
  //     singer_name: 'Taylor Swift',
  //   },
  // ];
}
