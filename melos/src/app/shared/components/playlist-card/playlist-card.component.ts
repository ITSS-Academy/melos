import { Component, Input } from '@angular/core';
import {RouterLink} from '@angular/router';

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
  @Input() id!: number;
  @Input() name!: string;
  @Input() img!: string;
  @Input() comment!: string;
  @Input() tag!: string;
  @Input() category: string = '';
  @Input() singer_name: string = '';
}
