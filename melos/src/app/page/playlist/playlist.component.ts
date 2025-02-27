import { Component } from '@angular/core';
import {PlaylistCardComponent} from '../../components/playlist-card/playlist-card.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    PlaylistCardComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

  playlists = [
    {
      name: "Radio",
      img: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/5/5/6/8/5568d11517ab8e384132d7f1c9e9434e.jpg",
      comment:"",
      tag:"",
      category:"Anison",
      singer_name:""
    },
    {
      name: "Taylor Swift",
      img: "https://upload.wikimedia.org/wikipedia/en/1/1f/Taylor_Swift_-_Taylor_Swift.png",
      comment:"",
      tag:"",
      category:"Country music",
      singer_name:"Taylor Swift"
    },
    {
      name: "Your playlist",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQat97yEF4kAwu3VAg-y8CxpP4GUGAvZEIMOye1RQ7ICXElVlz_drAm8_xga1fNXHvr0GA&usqp=CAU",
      comment:"",
      tag:"",
      category:"Country music",
      singer_name:"Taylor Swift"
    },

  ]
}
