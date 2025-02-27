import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-category-detail-card',
  standalone: true,
  imports: [],
  templateUrl: './category-detail-card.component.html',
  styleUrl: './category-detail-card.component.scss'
})
export class CategoryDetailCardComponent {
  @Input() id!: number
  @Input() img!: string
  @Input() comment!: string
  @Input() tag!: string
  @Input() category: string = ""
  @Input() time: string = "3:45"
  @Input() singer_name!: string

  list_music = [
    {
      id: 1,
      img: "https://cdn6.aptoide.com/imgs/f/a/0/fa09e649e67d44f6abe20d80b87ca210_icon.png",
      comment:"",
      tag:"",
      category:"Anison",
      singer_name:"Taylor",
      time: "3:45"
    },
    {
      id: 2,
      img: "https://play-lh.googleusercontent.com/xGDL1hGdZbrV38H3ts8cF5c5sQmIvLFtIyiIZcE4lmbxSrGccpRKsMaOaXE1KL5CDwk",
      comment:"",
      tag:"",
      category:"EDM",
      singer_name:"Son Tung",
      time: "3:45"

    },
    {
      id: 3,
      img: "https://danviet.mediacdn.vn/upload/1-2017/images/2017-03-31/149094658448091-lac-troi-teasing-artwork-ngang-logo-1481512811.jpg",
      comment:"",
      tag:"",
      category:"Rock",
      singer_name:"linh",
      time: "3:45"
    },
    {
      id: 4,
      img: "https://cdn-images.vtv.vn/zoom/640_400/66349b6076cb4dee98746cf1/2024/10/12/1728689173-jennie-mantra-us-24139931294930602860263-55915091550738881562145.jpg",
      comment:"",
      tag:"",
      category:"Country music",
      singer_name:"Rado",
      time: "3:45"
    },
    {
      id: 5,
      img: "https://image.anninhthudo.vn/w800/Uploaded/2025/ipjoohb/2023_05_04/1b84332b-cca7-4ee5-bed1-01a5779bf12c-5090-2782.jpeg",
      comment:"",
      tag:"",
      category:"Jazz",
      singer_name:"Sing",
      time: "3:45"

    },
    {
      id: 6,
      img: "https://i.ytimg.com/vi/DrITKSRCqGo/maxresdefault.jpg",
      comment:"",
      tag:"",
      category:"sara",
      singer_name:"Rado",
      time: "3:45"

    },
    {
      id: 7,
      img: "https://admin.musiconline.co/uploads/images/blog/header/hip-hop-muzik-tarihi.jpg",
      comment:"",
      tag:"",
      category:"Dom",
      singer_name:"Rado",
      time: "3:45"
    },
    {
      id: 8,
      img: "https://admin.musiconline.co/uploads/images/blog/header/hip-hop-muzik-tarihi.jpg",
      comment:"",
      tag:"",
      category:"Dom",
      singer_name:"Rado",
      time: "3:45"
    },
    {
      id: 9,
      img: "https://admin.musiconline.co/uploads/images/blog/header/hip-hop-muzik-tarihi.jpg",
      comment:"",
      tag:"",
      category:"Dom",
      singer_name:"Rado",
      time: "3:45"
    },


  ]

}

