import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [MusicTabComponent],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent {
  currentMusic!: any;
  constructor(private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.currentMusic = this.viewDetail(id);
    }
    console.log('Current Category:', this.currentMusic);
  }
  viewDetail(id: string) {
    const parsedId = parseInt(id, 10);
    return this.categories.find((category) => category.id === parsedId);
  }

  categories = [
    {
      id: 1,
      img: 'https://cdn6.aptoide.com/imgs/f/a/0/fa09e649e67d44f6abe20d80b87ca210_icon.png',
      comment: '',
      tag: '',
      category: 'Anison',
    },
    {
      id: 2,
      img: 'https://play-lh.googleusercontent.com/xGDL1hGdZbrV38H3ts8cF5c5sQmIvLFtIyiIZcE4lmbxSrGccpRKsMaOaXE1KL5CDwk',
      comment: '',
      tag: '',
      category: 'EDM',
    },
    {
      id: 3,
      img: 'https://static.vecteezy.com/system/resources/thumbnails/024/569/707/small_2x/rock-music-concert-background-illustration-ai-generative-free-photo.jpg',
      comment: '',
      tag: '',
      category: 'Rock',
    },
    {
      id: 4,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXR9cKCwLfAyxAlQcF5MdcibYCETp0Wa5iuw&s',
      comment: '',
      tag: '',
      category: 'Country music',
      singer_name: '',
    },
    {
      id: 5,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVZH0d5ZaMtAOWI2nYa9n8Uw28w4P-_rlAw&s',
      comment: '',
      tag: '',
      category: 'Jazz',
    },
    {
      id: 6,
      img: 'https://i.ytimg.com/vi/DrITKSRCqGo/maxresdefault.jpg',
      comment: '',
      tag: '',
      category: 'Opera',
    },
    {
      id: 7,
      img: 'https://admin.musiconline.co/uploads/images/blog/header/hip-hop-muzik-tarihi.jpg',
      comment: '',
      tag: '',
      category: 'Hip Hop',
    },
  ];
}
