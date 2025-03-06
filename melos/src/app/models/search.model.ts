import { AuthModel } from './auth.model';
import { SongModel } from './song.model';
import { CategoryModel } from './category.model';

export interface SearchModel {
  auth: AuthModel[];
  songs: SongModel[];
  categories: CategoryModel[];
}
