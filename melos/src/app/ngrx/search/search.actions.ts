import { createAction, props } from '@ngrx/store';
import { SearchModel } from '../../models/search.model';

export const searchAll = createAction(
  '[Search] Search All',
  props<{ query: string }>(),
);

export const searchAllSuccess = createAction(
  '[Search] Search All Success',
  props<{ search: SearchModel }>(),
);

export const searchAllFailure = createAction(
  '[Search] Search All Failure',
  props<{ error: any }>(),
);
