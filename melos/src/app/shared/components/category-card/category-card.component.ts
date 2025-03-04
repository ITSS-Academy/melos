import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CategoryModel} from "../../../models/category.model";

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  @Input() category!: CategoryModel;
}
