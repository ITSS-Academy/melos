import { Component } from '@angular/core';
import { SongModel } from '../../../models/song.model';

@Component({
  selector: 'app-card-artist',
  standalone: true,
  imports: [],
  templateUrl: './card-artist.component.html',
  styleUrl: './card-artist.component.scss',
})
export class CardArtistComponent {
  song: SongModel[] = [
    {
      id: 'Song-1',

      title: 'Nhạc việt',

      composer: 'Nhìn Quá ',

      performer: 'Nhìn Quá',

      file_path: 'string',

      image_url: 'https://avatar.iran.liara.run/public/39',

      category_id: 'string',

      createdAt: new Date(2015, 2, 20).toISOString(),

      uuid: 'string',

      views: 0,
    },

    {
      id: 'Song-2',

      title: 'Nhạc việt',

      composer: 'Nhìn Quá ',

      performer: 'Nhìn Quá',

      file_path: 'string',

      image_url: 'https://avatar.iran.liara.run/public/37',

      category_id: 'string',

      createdAt: new Date(2015, 2, 20).toISOString(),

      uuid: 'string',

      views: 0,
    },

    {
      id: 'Song-3',

      title: 'Nhạc việt',

      composer: 'Nhìn Quá ',

      performer: 'Nhìn Quá',

      file_path: 'string',

      image_url: 'https://avatar.iran.liara.run/public/37',

      category_id: 'string',

      createdAt: new Date(2015, 2, 20).toISOString(),

      uuid: 'string',

      views: 0,
    },

    {
      id: 'Song-4',

      title: 'Nhạc việt',

      composer: 'Nhìn Quá ',

      performer: 'Nhìn Quá',

      file_path: 'string',

      image_url: 'https://avatar.iran.liara.run/public/37',

      category_id: 'string',

      createdAt: new Date(2015, 2, 20).toISOString(),

      uuid: 'string',

      views: 0,
    },

    {
      id: 'Song-5',

      title: 'Nhạc việt',

      composer: 'Nhìn Quá ',

      performer: 'Nhìn Quá',

      file_path: 'string',

      image_url: 'https://avatar.iran.liara.run/public/37',

      category_id: 'string',

      createdAt: new Date(2015, 2, 20).toISOString(),

      uuid: 'string',

      views: 0,
    },

    {
      id: 'Song-6',

      title: 'Nhạc việt',

      composer: 'Nhìn Quá ',

      performer: 'Nhìn Quá',

      file_path: 'string',

      image_url: 'https://avatar.iran.liara.run/public/37',

      category_id: 'string',

      createdAt: new Date(2015, 2, 20).toISOString(),

      uuid: 'string',

      views: 0,
    },
  ];
}
