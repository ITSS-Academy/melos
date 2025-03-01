import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  getSongDetail(songId: string) {
    return this.http.get<SongModel>(
      `http://localhost:3000/songs/${songId}/hls-url`,
    );
  }

  getSongList() {
    return this.http.get<SongModel[]>('http://localhost:3000/songs/all');
  }

  createSong(song: SongModel, idToken: string) {
    //with header Authorization
    const headers = {
      Authorization: idToken,
    };

    console.log('song services create song', song);
    const formData = new FormData();
    formData.append('title', song.title);
    formData.append('composer', song.composer);
    formData.append('performer', song.performer);
    formData.append('files', song.file_path);
    formData.append('files', song.image_url);
    formData.append('uuid', song.uuid);
    formData.append('views', song.views.toString());
    formData.append('category_id', '83dbd264-a983-440f-941e-ace43ce5f2ff');
    return this.http.post<SongModel>('http://localhost:3000/songs', formData, {
      headers,
    });
  }

  private currentSongSubject = new BehaviorSubject<SongModel | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  setCurrentSong(song: SongModel) {
    this.currentSongSubject.next(song);
  }

  private playStateSubject = new BehaviorSubject<boolean>(false);
  playState$ = this.playStateSubject.asObservable();

  setPlayState(isPlaying: boolean) {
    this.playStateSubject.next(isPlaying);
  }

  dummyData: SongModel[] = [
    {
      id: '1',
      title: 'Bulbel',
      composer: 'Mili',
      performer: 'Mili',
      file_path: '',
      image_url:
        'https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2F23fc72168aa06c4e30e97a68dabb8b70.1000x1000x1.jpg',
      category_id: '1',
      createdAt: new Date('2021-09-01').toISOString(),
      uuid: '1',
      views: 0,
    },
    {
      id: '2',
      title: 'Gone Angels',
      composer: 'Mili',
      performer: 'Mili',
      file_path: '',
      image_url:
        'https://images.genius.com/99b2d0dab6b453c3e2be855f8d3d913c.1000x1000x1.png',
      category_id: '1',
      createdAt: new Date('2021-09-01').toISOString(),
      uuid: '1',
      views: 0,
    },
    {
      id: '3',
      title: 'Through Patches Of Violet',
      composer: 'Mili',
      performer: 'Mili',
      file_path: '',
      image_url:
        'https://images.genius.com/0d35c4ab953fe95571a0f9647fc705f4.741x741x1.png',
      category_id: '1',
      createdAt: new Date('2021-09-01').toISOString(),
      uuid: '1',
      views: 0,
    },
    {
      id: '4',
      title: 'World.Execute(me);',
      composer: 'Mili',
      performer: 'Mili',
      file_path: '',
      image_url:
          'https://i1.sndcdn.com/artworks-cyeDndDTj38pXMYp-zoFfyQ-t500x500.jpg',
      category_id: '1',
      createdAt: new Date('2021-09-01').toISOString(),
      uuid: '1',
      views: 0,
    },
  ];
}
