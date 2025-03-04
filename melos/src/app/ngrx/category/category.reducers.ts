import {CategoryState} from './category.state';
import {CategoryModel} from '../../models/category.model';
import {createReducer, on} from '@ngrx/store';

import * as CategoryActions from './category.actions';

export const initialCategoryState: CategoryState = {
  categoryDetail: <CategoryModel>{},
  categoryList: <CategoryModel[]>[],
  isLoading: false,
  error: null,
};

export const categoryReducer = createReducer(
  initialCategoryState,

  // Lấy chi tiết danh mục
  on(CategoryActions.getCategoryById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CategoryActions.getCategoryByIdSuccess, (state, { categoryDetail, type }) => {
    console.log(type);
    return <CategoryState>{
      ...state,
      categoryDetail: categoryDetail,
      isLoading: false,
    };
  }),

  on(CategoryActions.getCategoryByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  // Lấy danh sách danh mục
  on(CategoryActions.getCategoryList, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CategoryActions.getCategoryListSuccess, (state, { categoryList, type }) => {
    console.log(type);
    return <CategoryState>{
      ...state,
      categoryList: categoryList,
      isLoading: false,
    };
  }),

  on(CategoryActions.getCategoryListFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  // Tạo danh mục mới
  on(CategoryActions.createCategory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CategoryActions.createCategorySuccess, (state, { category, type }) => {
    console.log(type);
    return <CategoryState>{
      ...state,
      categoryDetail: category,
      isLoading: false,
    };
  }),

  on(CategoryActions.createCategoryFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    console.log(error.message);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
);
