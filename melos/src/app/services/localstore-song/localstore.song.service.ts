import { Injectable } from '@angular/core';
import { SongModel } from '../../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class LocalstoreSongService {
  constructor() {}

  saveSong(song: SongModel) {
    this.removeSong();
    localStorage.setItem('currentSong', JSON.stringify(song));
  }

  getSong(): SongModel {
    const song = localStorage.getItem('currentSong');
    return song ? JSON.parse(song) : null;
  }

  removeSong() {
    localStorage.removeItem('currentSong');
  }
}
