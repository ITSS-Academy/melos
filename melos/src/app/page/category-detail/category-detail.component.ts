import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicTabComponent } from '../../shared/components/music-tab/music-tab.component';
import { OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SongState } from '../../ngrx/song/song.state';
import { Store } from '@ngrx/store';
import { SongModel } from '../../models/song.model';
import * as SongActions from '../../ngrx/song/song.actions';
import { CategoryModel } from '../../models/category.model';
import { CategoryState } from '../../ngrx/category/category.state';
import * as CategoryActions from '../../ngrx/category/category.actions';
import { LikeState } from '../../ngrx/like/like.state';
import { AsyncPipe, Location } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { MaterialModule } from "../../shared/material.module";


@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [MusicTabComponent, AsyncPipe, LoadingComponent, MaterialModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  currentMusic!: any;
  subscriptions: Subscription[] = [];
  songListsCategory: SongModel[] = [];
  songListsCategory$!: Observable<SongModel[]>;
  categoryDetail!: CategoryModel;
  categoryDetail$!: Observable<CategoryModel>;
  isLoadingDetail$!: Observable<boolean>;
  likeList$!: Observable<string[]>;
  likeList: string[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{
      song: SongState;
      category: CategoryState;
      like: LikeState;
    }>,
    private location: Location
  ) {
    this.songListsCategory$ = this.store.select('song', 'songCategories');
    this.categoryDetail$ = this.store.select('category', 'categoryDetail');
    this.isLoadingDetail$ = this.store.select('category', 'isLoading');
    this.likeList$ = this.store.select('like', 'songIdLikes');
  }

  clickBack() {
    this.location.back();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        console.log('id: ', id);

        this.store.dispatch(SongActions.getSongCategories({ id: id }));
        this.store.dispatch(CategoryActions.getCategoryById({ id: id }));
      }
    });
    this.subscriptions.push(
      this.songListsCategory$.subscribe((songLists) => {
        if (songLists.length > 0) {
          this.songListsCategory = songLists;
          console.log(songLists);
        }
      }),

      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
          console.log(likeLists);
        }
      }),
      this.categoryDetail$.subscribe((categoryDetail) => {
        if (categoryDetail) {
          this.categoryDetail = categoryDetail;
          console.log(categoryDetail);
        }
      }),
    );
  }


  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.store.dispatch(SongActions.clearStateSongCategory());
    this.store.dispatch(CategoryActions.clearCategoryDetail());
  }
}
