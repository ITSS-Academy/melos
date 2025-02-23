import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Hls from 'hls.js';
import { IMediaElement, VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { SongService } from '../../../services/song/song.service';
import { SongModel } from '../../../models/song.model';

@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [
    VgCoreModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    VgControlsModule,
  ],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.scss',
})
export class MusicBarComponent implements OnInit {
  // apiUrl = 'http://localhost:3000/songs/7846deea-49d2-4652-ae49-575a66bfbe52/hls-url';
  currentSong: SongModel | null = null;
  constructor(private songService: SongService) {}
  hlsUrl: string | null = null;
  error: string | null = null;
  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;
  @Output()
  songPlaying = new EventEmitter<boolean>();

  ngOnInit() {
    this.songService.currentSong$.subscribe((song) => {
      this.currentSong = song;
      // this.songPlaying.emit(!!song);
      console.log(song);
      if (song) {
        console.log(song);

        this.hlsUrl = `https://fribhpcpiubpvmuhgadg.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
        console.log(this.hlsUrl);
        this.setupHls();
      }
    });
  }
  // getSong() {
  //   // Gọi API để lấy thông tin bài hát và URL HLS playlist
  //
  //   this.http.get<{ hlsUrl: string }>(this.apiUrl).subscribe(
  //     (response) => {
  //       console.log(response.hlsUrl);
  //
  //       this.hlsUrl = response.hlsUrl;
  //       this.setupHls();
  //     },
  //     (err) => {
  //       this.error = 'Failed to load HLS URL. Please check your API.';
  //     }
  //   );
  // }

  setupHls(): void {
    console.log(this.hlsUrl);
    if (!this.hlsUrl || !this.audioPlayer) {
      console.error('Missing HLS URL or audio element');
      return;
    }

    const audio = this.audioPlayer.nativeElement;

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 30, // Buffer tối đa 30 giây
        maxMaxBufferLength: 60, // Buffer tối đa khi mạng tốt
        startFragPrefetch: true, // Prefetch phân đoạn tiếp theo
      });
      hls.loadSource(this.hlsUrl);
      hls.attachMedia(audio);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest loaded, ready to play');
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
            console.warn('Buffer stalled, attempting to recover...');
            hls.startLoad(); // Thử tải lại
          } else {
            console.error('Media error detected, attempting to recover...');
            hls.recoverMediaError(); // Thử phục hồi media
          }
        } else if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          console.error('Network error detected:', data);
        } else {
          console.error('Fatal error detected:', data);
          hls.destroy(); // Dừng stream nếu lỗi nghiêm trọng
        }
      });
    } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
      audio.src = this.hlsUrl;
      audio.play().catch((err) => {
        console.error('Error playing HLS:', err);
        this.error = 'Failed to play HLS stream';
      });
    } else {
      this.error = 'HLS is not supported on your browser.';
    }
  }
}
