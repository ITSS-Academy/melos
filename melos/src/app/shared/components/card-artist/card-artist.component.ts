import {Component, Input} from '@angular/core';
import { SongModel } from '../../../models/song.model';
import {AuthModel} from '../../../models/auth.model';

@Component({
  selector: 'app-card-artist',
  standalone: true,
  imports: [],
  templateUrl: './card-artist.component.html',
  styleUrl: './card-artist.component.scss',
})
export class CardArtistComponent {

  @Input() auth!: any; // Dùng kiểu any

}
