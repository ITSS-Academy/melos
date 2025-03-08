import { createAction, props } from '@ngrx/store';
import { CategoryModel } from '../../models/category.model';

// Lấy chi tiết danh mục
export const getCategoryById = createAction(
  '[Category] Get Category Detail',
  props<{ id: string }>(),
);

export const getCategoryByIdSuccess = createAction(
  '[Category] Get Category Detail Success',
  props<{ categoryDetail: CategoryModel }>(),
);

export const getCategoryByIdFailure = createAction(
  '[Category] Get Category Detail Failure',
  props<{ error: any }>(),
);

// Lấy danh sách danh mục
export const getCategoryList = createAction('[Category] Get Category List');

export const getCategoryListSuccess = createAction(
  '[Category] Get Category List Success',
  props<{ categoryList: CategoryModel[] }>(),
);

export const getCategoryListFailure = createAction(
  '[Category] Get Category List Failure',
  props<{ error: any }>(),
);

// Tạo danh mục mới
export const createCategory = createAction(
  '[Category] Create Category',
  props<{ category: CategoryModel; idToken: string }>(),
);

export const createCategorySuccess = createAction(
  '[Category] Create Category Success',
  props<{ category: CategoryModel }>(),
);

export const createCategoryFailure = createAction(
  '[Category] Create Category Failure',
  props<{ error: any }>(),
);

export const clearCategoryDetail = createAction(
  '[Category] Clear Category Detail',
);
