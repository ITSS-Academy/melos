import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-playlist-detail',
  standalone: true,
  imports: [],
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss'
})
export class PlaylistDetailComponent {
  currentMusic!: any;
  constructor(private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.currentMusic = this.viewDetail(id);
    }
  }

  viewDetail(id: string) {
    const parsedId = parseInt(id, 10);
    return this.playlists.find((playlist) => playlist.id === parsedId);
  }

  playlists = [
    {
      id: 1,
      name: 'Radio',
      img: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/5/6/8/5568d11517ab8e384132d7f1c9e9434e.jpg',
      comment: '',
      tag: '',
      category: 'Anison',
      singer_name: '',
    },
    {
      id: 2,
      name: 'Taylor Swift',
      img: 'https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png',
      comment: '',
      tag: '',
      category: 'Country music',
      singer_name: 'Taylor Swift',
    },
    {
      id: 3,

      name: 'Your playlist',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQat97yEF4kAwu3VAg-y8CxpP4GUGAvZEIMOye1RQ7ICXElVlz_drAm8_xga1fNXHvr0GA&usqp=CAU',
      comment: '',
      tag: '',
      category: 'Country music',
      singer_name: 'Taylor Swift',
    },
  ];

}
