import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {CategoryService} from '../../services/category/category.service';

import * as CategoryActions from './category.actions';


export const getDetailCategory = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(CategoryActions.getCategoryById),
      exhaustMap((action) =>
        categoryService.getCategoryDetail(action.id).pipe(
          map((categoryDetail) => CategoryActions.getCategoryByIdSuccess({ categoryDetail })),
          catchError((error) => of(CategoryActions.getCategoryByIdFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getListCategories = createEffect(
  (actions$ = inject(Actions), categoryService = inject(CategoryService)) => {
    return actions$.pipe(
      ofType(CategoryActions.getCategoryList),
      exhaustMap(() =>
        categoryService.getCategoryList().pipe(
          map((categoryList) => CategoryActions.getCategoryListSuccess({ categoryList })),
          catchError((error) => of(CategoryActions.getCategoryListFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
