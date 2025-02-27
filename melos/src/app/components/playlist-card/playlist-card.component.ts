import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-playlist-card',
  standalone: true,
  imports: [],
  templateUrl: './playlist-card.component.html',
  styleUrl: './playlist-card.component.scss'
})
export class PlaylistCardComponent {

  @Input()  name!: string
  @Input()  img!: string
  @Input()  comment!: string
  @Input()  tag!:string
  @Input()  category:string = ""
  @Input()  singer_name: string = ""
}
