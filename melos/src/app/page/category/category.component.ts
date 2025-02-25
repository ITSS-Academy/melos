import { Component } from '@angular/core';
import {MaterialModule} from '../../shared/material.module';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

}
