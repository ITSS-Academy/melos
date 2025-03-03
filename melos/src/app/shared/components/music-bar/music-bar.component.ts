import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Hls from 'hls.js';

import { SongService } from '../../../services/song/song.service';
import { SongModel } from '../../../models/song.model';
import { MaterialModule } from '../../material.module';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-music-bar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './music-bar.component.html',
  styleUrl: './music-bar.component.scss',
})
export class MusicBarComponent implements OnInit {
  // // apiUrl = 'http://localhost:3000/songs/7846deea-49d2-4652-ae49-575a66bfbe52/hls-url';
  // currentSong: SongModel | null = null;
  // constructor(private songService: SongService) {}
  // hlsUrl: string | null = null;
  // error: string | null = null;
  // @ViewChild('audioPlayer', { static: true })
  // audioPlayer!: ElementRef<HTMLAudioElement>;
  // @Output()
  // songPlaying = new EventEmitter<boolean>();
  //
  // ngOnInit() {
  //   this.songService.currentSong$.subscribe((song) => {
  //     this.currentSong = song;
  //     // this.songPlaying.emit(!!song);
  //     console.log(song);
  //     if (song) {
  //       console.log(song);
  //
  //       this.hlsUrl = `https://fribhpcpiubpvmuhgadg.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
  //       console.log(this.hlsUrl);
  //       this.setupHls();
  //     }
  //   });
  // }
  // // getSong() {
  // //   // Gọi API để lấy thông tin bài hát và URL HLS playlist
  // //
  // //   this.http.get<{ hlsUrl: string }>(this.apiUrl).subscribe(
  // //     (response) => {
  // //       console.log(response.hlsUrl);
  // //
  // //       this.hlsUrl = response.hlsUrl;
  // //       this.setupHls();
  // //     },
  // //     (err) => {
  // //       this.error = 'Failed to load HLS URL. Please check your API.';
  // //     }
  // //   );
  // // }
  //
  // setupHls(): void {
  //   console.log(this.hlsUrl);
  //   if (!this.hlsUrl || !this.audioPlayer) {
  //     console.error('Missing HLS URL or audio element');
  //     return;
  //   }
  //
  //   const audio = this.audioPlayer.nativeElement;
  //
  //   if (Hls.isSupported()) {
  //     const hls = new Hls({
  //       maxBufferLength: 30, // Buffer tối đa 30 giây
  //       maxMaxBufferLength: 60, // Buffer tối đa khi mạng tốt
  //       startFragPrefetch: true, // Prefetch phân đoạn tiếp theo
  //     });
  //     hls.loadSource(this.hlsUrl);
  //     hls.attachMedia(audio);
  //
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       console.log('HLS manifest loaded, ready to play');
  //     });
  //
  //     hls.on(Hls.Events.ERROR, (event, data) => {
  //       if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
  //         if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
  //           console.warn('Buffer stalled, attempting to recover...');
  //           hls.startLoad(); // Thử tải lại
  //         } else {
  //           console.error('Media error detected, attempting to recover...');
  //           hls.recoverMediaError(); // Thử phục hồi media
  //         }
  //       } else if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
  //         console.error('Network error detected:', data);
  //       } else {
  //         console.error('Fatal error detected:', data);
  //         hls.destroy(); // Dừng stream nếu lỗi nghiêm trọng
  //       }
  //     });
  //   } else if (audio.canPlayType('application/vnd.apple.mpegurl')) {
  //     audio.src = this.hlsUrl;
  //     audio.play().catch((err) => {
  //       console.error('Error playing HLS:', err);
  //       this.error = 'Failed to play HLS stream';
  //     });
  //   } else {
  //     this.error = 'HLS is not supported on your browser.';
  //   }
  // }
  currentSong: SongModel | null = null;
  hlsUrl: string | null = null;
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  volume = 50;
  subscriptions: Subscription[] = [];

  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(private songService: SongService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.songService.currentSong$.subscribe((song) => {
        this.currentSong = song;
        if (song) {
          this.hlsUrl = `https://fribhpcpiubpvmuhgadg.supabase.co/storage/v1/object/public/songs/${song.file_path}`;
          this.setupHls();
        }
      }),
      this.songService.playState$.subscribe((isPlaying) => {
        this.isPlaying = isPlaying;
      }),
    );

    this.updateChangeVolume();
  }

  setupHls(): void {
    const audio = this.audioPlayer.nativeElement;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.hlsUrl!);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audio.play();
      });
    } else {
      audio.src = this.hlsUrl!;
      audio.preload = 'auto';
      audio.play();
    }

    // Cập nhật tiến trình
    audio.ontimeupdate = () => {
      this.currentTime = audio.currentTime;
      this.duration = audio.duration || 100;
      this.updateProgressBar(); // Gọi hàm cập nhật thanh tiến trình
    };

    // Cập nhật trạng thái play/pause
    audio.onplay = () => this.songService.setPlayState(true);
    audio.onpause = () => this.songService.setPlayState(false);
  }

  //Cập nhật thanh có màu theo thời gian bài hát chạy
  updateProgressBar() {
    const progress = (this.currentTime / this.duration) * 100;
    const progressBar = document.querySelector('.progress-bar') as HTMLInputElement;
    if (progressBar) {
      // progressBar.style.background = `linear-gradient(to right, #2196F3 ${progress}%, #ccc ${progress}%)`;
      progressBar.style.setProperty('--progress', `${progress}%`);
    }
  }


  togglePlayPause() {
    const audio = this.audioPlayer.nativeElement;
    if (audio.paused) {
      audio.play();
      this.songService.setPlayState(!this.isPlaying);
    } else {
      audio.pause();
      this.songService.setPlayState(!this.isPlaying);
    }
  }

  seekAudio(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = (event.target.value / this.duration) * audio.duration;
  }

  changeVolume(event: any) {
    const audio = this.audioPlayer.nativeElement;
    audio.volume = event.target.value / 100;
    this.volume = event.target.value;
    this.updateChangeVolume()
  }

  updateChangeVolume() {
    const volumeBar = document.querySelector('.volume-bar') as HTMLInputElement;
    if (volumeBar) {
      const volume = this.volume || 50; // Giả sử mặc định là 50%
      volumeBar.style.setProperty('--volume', `${volume}%`);
    }
  }


  rewind() {
    this.audioPlayer.nativeElement.currentTime -= 10;
  }

  forward() {
    this.audioPlayer.nativeElement.currentTime += 10;
  }

  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}
