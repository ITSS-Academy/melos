import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from "../../material.module";
import {SongService} from "../../../services/song/song.service";
import {SongModel} from "../../../models/song.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-music-tab',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './music-tab.component.html',
  styleUrl: './music-tab.component.scss'
})
export class MusicTabComponent implements OnInit {
  isPlaying = false;
  private subscription: Subscription[] = [];
  constructor(private songService: SongService) {

  }
  ngOnInit() {
    this.subscription.push(
        this.songService.currentSong$.subscribe((currentSong) =>
        {
          try {
            this.isPlaying = currentSong?.id == this.song.id;
          } catch (e) {
            console.log(e);
          }
        })
    )
  }
  @Input() song!:SongModel;
  playSong() {
    if (this.isPlaying) {
      this.songService.setPlayState(false);
      return;
    }
    console.log(this.song);
    this.songService.setCurrentSong(this.song);
    this.songService.setPlayState(true);
  }
}
