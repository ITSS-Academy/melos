import {CategoryModel} from '../../models/category.model';

export interface CategoryState {
  categoryDetail: CategoryModel;
  categoryList: CategoryModel[];
  isLoading: boolean;
  error: any;
}
