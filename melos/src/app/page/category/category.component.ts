import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryCardComponent } from '../../shared/components/category-card/category-card.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from '../../models/category.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../ngrx/category/category.state';
import { CategoryService } from '../../services/category/category.service';
import * as CategoryActions from '../../ngrx/category/category.actions';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CategoryCardComponent, AsyncPipe, LoadingComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {
  categoryList: CategoryModel[] = [];
  categoryList$!: Observable<CategoryModel[]>;
  isDetailLoading$!: Observable<boolean>;

  subscriptions: Subscription[] = [];
  constructor(
    private store: Store<{
      category: CategoryState;
    }>,
    public CategoryService: CategoryService,
  ) {
    this.categoryList$ = store.select('category', 'categoryList');
    this.isDetailLoading$ = store.select('category', 'isLoadingDetail');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.categoryList$.subscribe((categoryList) => {
        if (categoryList && categoryList.length > 0) {
          this.categoryList = categoryList;
          console.log(categoryList);
        }
      }),
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
