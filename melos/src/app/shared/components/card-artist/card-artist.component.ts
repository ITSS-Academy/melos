import {Component, Input} from '@angular/core';
import { SongModel } from '../../../models/song.model';
import {AuthModel} from '../../../models/auth.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-card-artist',
  standalone: true,
  imports: [],
  templateUrl: './card-artist.component.html',
  styleUrl: './card-artist.component.scss',
})
export class CardArtistComponent {
  constructor(
    private router: Router,
  ) {
  }

  @Input() user!: any; // Dùng kiểu any
  onError(event: Event) {
    const element = event.target as HTMLImageElement;
    element.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }

  navigateToProfile(uid: string) {
    this.router.navigate(['/profile', uid]);
  }
}
