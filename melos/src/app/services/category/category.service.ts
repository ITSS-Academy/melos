import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../../models/category.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategoryList() {
    return this.http.get<CategoryModel[]>('http://localhost:3000/category/all');
  }

  getCategoryDetail(categoryId: string) {
    return this.http.get<CategoryModel>(
      `http://localhost:3000/category/${categoryId}`
    );
  }

}
