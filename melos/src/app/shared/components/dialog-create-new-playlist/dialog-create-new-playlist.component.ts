import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PlaylistModel} from '../../../models/playlist.model';

// id: string;
// name: string;
// songs_id: string[];
// uid: string;
// created_at: string;
// image_url: string | File;
// is_pined: boolean;
// description: string;
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
  imgPath: string = '';


  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      songs_id: [], // Mảng rỗng ban đầu
      uid: '',
      created_at: [new Date().toISOString()],
      image_url: [null, Validators.required],
      is_pined: [false]
    });
  }

  uploadImg(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('Chỉ hỗ trợ các định dạng JPG, JPEG, PNG, GIF, hoặc WEBP!');
      return;
    }

    this.form.patchValue({ image_url: file });

    // Đọc file và hiển thị ảnh
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgPath = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  createPlaylist() {
    if (this.form.valid) {
      const playlist: PlaylistModel = this.form.value;
      console.log('Tạo Playlist:', playlist);
      this.dialogRef.close(playlist);
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
}
