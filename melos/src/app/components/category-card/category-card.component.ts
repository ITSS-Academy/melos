import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {

  @Input()  id!: number
  @Input()  img!: string
  @Input()  comment!: string
  @Input()  tag!:string
  @Input()  category:string = ""

}
