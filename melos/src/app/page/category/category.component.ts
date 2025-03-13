import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../models/category.model';
import {Observable, Subject, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../ngrx/category/category.state';
import { CategoryService } from '../../services/category/category.service';
import * as CategoryActions from '../../ngrx/category/category.actions';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import {MatIcon} from "@angular/material/icon";
import * as SearchActions from "../../ngrx/search/search.actions";
@Component({
  selector: 'app-category',
  standalone: true,
    imports: [CategoryCardComponent, AsyncPipe, LoadingComponent, MatIcon],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryList: CategoryModel[] = [];
  filledCategoryList: CategoryModel[] = [];
  categoryList$!: Observable<CategoryModel[]>;
  isLoading$!: Observable<boolean>;

  subscriptions: Subscription[] = [];
  constructor(
    private store: Store<{
      category: CategoryState;
    }>,
    public CategoryService: CategoryService,
  ) {
    this.categoryList$ = store.select('category', 'categoryList');
    this.isLoading$ = store.select('category', 'isLoading');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.categoryList$.subscribe((categoryList) => {
        if (categoryList && categoryList.length > 0) {
          this.categoryList = categoryList;
          console.log(categoryList);
          this.filledCategoryList = this.categoryList
        }
      }),

    );

  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onEnter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.filledCategoryList = this.categoryList.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
