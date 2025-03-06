import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';
import {PlaylistModel} from '../../../models/playlist.model';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss',
})
export class PlaylistCardComponent {
  @Input() playlist!: PlaylistModel;

}
