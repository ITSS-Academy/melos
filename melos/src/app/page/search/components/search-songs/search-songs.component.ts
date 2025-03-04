import { Component } from '@angular/core';
import {CardArtistComponent} from "../../../../shared/components/card-artist/card-artist.component";
import {MusicTabComponent} from "../../../../shared/components/music-tab/music-tab.component";

@Component({
  selector: 'app-search-songs',
  standalone: true,
    imports: [
        CardArtistComponent,
        MusicTabComponent
    ],
  templateUrl: './search-songs.component.html',
  styleUrl: './search-songs.component.scss'
})
export class SearchSongsComponent {

}
