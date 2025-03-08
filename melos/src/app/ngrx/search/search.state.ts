import { SearchModel } from '../../models/search.model';

export interface SearchState {
  search: SearchModel;
  isLoading: boolean;
  error: any;
}
