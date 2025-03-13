import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SongModel } from '../../models/song.model';
import { Store } from '@ngrx/store';
import { SongState } from '../../ngrx/song/song.state';
import { SongService } from '../../services/song/song.service';
import * as SongActions from '../../ngrx/song/song.actions';
import { MusicCardComponent } from '../../shared/components/music-card/music-card.component';
import { MaterialModule } from '../../shared/material.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CategoryModel } from '../../models/category.model';
import { CategoryState } from '../../ngrx/category/category.state';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MusicCardComponent, MaterialModule, AsyncPipe, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  songLists$!: Observable<SongModel[]>;
  subscriptions: Subscription[] = [];
  songLists: SongModel[] = [];
  isLoading$!: Observable<boolean>;
  categoryList: CategoryModel[] = [];
  categoryList$!: Observable<CategoryModel[]>;
  constructor(
    private store: Store<{
      song: SongState;
      category: CategoryState;
    }>,
    public SongService: SongService,
    public CategoryService: CategoryService,
  ) {
    this.songLists$ = store.select('song', 'songList');
    this.isLoading$ = this.store.select('song', 'isLoading');
    this.store.dispatch(SongActions.getSongList());
    this.categoryList$ = store.select('category', 'categoryList');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.songLists$.subscribe((songLists) => {
        if (songLists.length > 0) {
          this.songLists = this.shuffleArray([...songLists]); // Trộn ngẫu nhiên mỗi lần reload trang
          this.songLists = this.shuffleArray(songLists);
          console.log(songLists);
        }
      }),
    );
  }

  get trendingSongs(): SongModel[] {
    return this.songLists.filter((song) => song.views >= 10);
  }

  get categorySongs(): SongModel[] {
    return this.songLists.filter(
      (song) => song.category_id == '22825f6e-086d-4b6c-9091-dc314811fe35' && song.views >= 10,
    );
  }

  // Hàm trộn danh sách bài hát (Fisher-Yates Shuffle)
  private shuffleArray(array: SongModel[]): SongModel[] {
    return array
      .map((song) => ({ song, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ song }) => song);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  toLeft(list: string) {
    const carousel = document.getElementById(list) as HTMLElement;
    carousel.scrollLeft -= carousel.clientWidth;
  }
  toRight(list: string) {
    const carousel = document.getElementById(list) as HTMLElement;
    carousel.scrollLeft += carousel.clientWidth;
  }
}
