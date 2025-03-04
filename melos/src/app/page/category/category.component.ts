import {Component, OnDestroy, OnInit} from '@angular/core';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../models/category.model';
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {CategoryState} from "../../ngrx/category/category.state";
import {CategoryService} from "../../services/category/category.service";
import * as CategoryActions from "../../ngrx/category/category.actions";
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy{
  categoryList : CategoryModel[] = [];
  categoryList$ !: Observable<CategoryModel[]>;

  subscriptions: Subscription[] = [];
  constructor(private store: Store<{
    category: CategoryState;
  }>,
              public CategoryService: CategoryService,) {
    this.categoryList$ = store.select('category', 'categoryList');
  }
  viewDetail(id: string) {
    const parsedId = parseInt(id, 10);
    return this.categories.find((category) => category.id === parsedId);
  }

  ngOnInit() {
    this.subscriptions.push(
        this.categoryList$.subscribe((categoryList) => {
            if (categoryList && categoryList.length > 0) {
            this.categoryList = categoryList;
            console.log(categoryList);
            }
        }),
    )
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
    {
      id: 8,
      img: 'https://admin.musiconline.co/uploads/images/blog/header/hip-hop-muzik-tarihi.jpg',
      comment: '',
      tag: '',
      category: 'Hip Hop',
    },
  ];
}
