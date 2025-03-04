import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { SongModel } from '../../../models/song.model';
import { SongService } from '../../../services/song/song.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-music-card',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './music-card.component.html',
  styleUrl: './music-card.component.scss',
})
export class MusicCardComponent {
  constructor(private songService: SongService) {}

  @Input() song!: SongModel;
  playSong() {
    console.log(this.song);

    this.songService.setCurrentSong(this.song);
    // setTimeout(() => {
    //   const audioElement = document.getElementById(
    //     'singleAudio',
    //   ) as HTMLAudioElement;
    //   if (audioElement) {
    //     audioElement
    //       .play()
    //       .catch((err) => console.error('Lỗi khi phát nhạc:', err));
    //   }
    // }, 500);
  }
}
