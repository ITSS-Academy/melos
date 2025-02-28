import { Component } from '@angular/core';
import {CardArtistComponent} from "../../../../shared/components/card-artist/card-artist.component";

@Component({
  selector: 'app-search-songs',
  standalone: true,
    imports: [
        CardArtistComponent
    ],
  templateUrl: './search-songs.component.html',
  styleUrl: './search-songs.component.scss'
})
export class SearchSongsComponent {

}
