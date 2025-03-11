import { Injectable } from '@angular/core';
import {SongModel} from "../../models/song.model";

@Injectable({
  providedIn: 'root'
})
export class LocalstoreSongService {

  constructor() { }

  saveSong(song: SongModel) {
    this.removeSong();
    localStorage.setItem('currentSong', JSON.stringify(song));
    console.log('Song saved to local storage', song);
  }

  getSong(): SongModel {
    const song = localStorage.getItem('currentSong');
    console.log('Song retrieved from local storage', song);
    return song ? JSON.parse(song) : null;
  }

  removeSong() {
    localStorage.removeItem('currentSong');
  }
}
