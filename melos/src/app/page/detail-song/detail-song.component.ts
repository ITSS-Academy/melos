import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MusicCardComponent} from "../../shared/components/music-card/music-card.component";
import {NgForOf} from "@angular/common";
import {MaterialModule} from "../../shared/material.module";
@Component({
  selector: 'app-detail-song',
  standalone: true,
    imports: [
        MatIcon,
        MatIconButton,
        MusicCardComponent,
        NgForOf,
        MaterialModule
    ],
  templateUrl: './detail-song.component.html',
  styleUrl: './detail-song.component.scss'
})
export class DetailSongComponent {

}
