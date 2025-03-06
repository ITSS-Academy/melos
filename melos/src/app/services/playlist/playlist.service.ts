import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlaylistModel} from '../../models/playlist.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private http: HttpClient) { }

  getPlaylistById(uid: string ,idToken: string){

    const headers = {
      Authorization: idToken
    }

    return this.http.get<PlaylistModel[]>(`http://localhost:3000/playlists/user?uid=${uid}`,{headers})
  }
  getPlaylistDetail(playlistID: string){
    return this.http.get<PlaylistModel>(`http://localhost:3000/playlists?id=${playlistID}`
    )
  }


  createPlaylist(playlist: PlaylistModel ,idToken: string){
    const headers = {
      Authorization: idToken,
    }

    console.log('song services create playlist', playlist);
    console.log(playlist.uid)
    const formData = new FormData()
    formData.append('uid', playlist.uid)
    formData.append('name', playlist.name)
    formData.append('file', playlist.image_url)
    formData.append('created_at', playlist.created_at)
    formData.append('description', playlist.description)
    formData.append('is_pined', JSON.stringify(playlist.is_pined))
    formData.append('songs_id', JSON.stringify(playlist.songs_id))

    return this.http.post<PlaylistModel>('http://localhost:3000/playlists', formData, {
      headers,
    })
  }

}
