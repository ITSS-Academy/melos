import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';


interface Playlist {
  img : string
  name: string
  description: string
}
@Component({
  selector: 'app-dialog-create-new-playlist',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgIf],
  templateUrl: './dialog-create-new-playlist.component.html',
  styleUrl: './dialog-create-new-playlist.component.scss'
})
export class DialogCreateNewPlaylistComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DialogCreateNewPlaylistComponent>,
    private fb : FormBuilder

  ) {}
  form!: FormGroup;
  result: string = ''
  playlists: Playlist[] = []
  imgPath: string = ''

  ngOnInit() {
    this.form= this.fb.group({
      img: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  uploadImg(event: any) {
    const file = event.target.files[0];
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (!file.type.startsWith('image/') || !allowedExtensions.includes(fileExtension)) {
        alert('Chỉ được upload file JPG, JPEG, PNG, GIF, hoặc WEBP!');
        return;
      }
      this.imgPath = URL.createObjectURL(file); // Tạo URL ảnh tạm thời
      this.form.patchValue({img: this.imgPath}); // Gán đường dẫn vào form
    }
  }
  createPlaylist(){
    if( this.form.invalid){
      this.result= 'Form is invalid'
      return
    }

    const {img, name, description} = this.form.value

    // them san pham
    this.playlists.push({img, name, description})

    console.log(this.playlists)
  }

}
