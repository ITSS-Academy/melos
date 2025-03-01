import { Component } from '@angular/core';
import {CardArtistComponent} from "../../../../shared/components/card-artist/card-artist.component";

@Component({
  selector: 'app-search-peoples',
  standalone: true,
    imports: [
        CardArtistComponent
    ],
  templateUrl: './search-peoples.component.html',
  styleUrl: './search-peoples.component.scss'
})
export class SearchPeoplesComponent {

}
