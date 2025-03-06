import {Component, OnInit} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import {PlaylistModel} from '../../../models/playlist.model';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions'
import {Store} from '@ngrx/store';
import {AuthState} from '../../../ngrx/auth/auth.state';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../models/auth.model';


@Component({
  selector: 'app-dialog-create-new-playlist',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgIf],
  templateUrl: './dialog-create-new-playlist.component.html',
  styleUrl: './dialog-create-new-playlist.component.scss'
})
export class DialogCreateNewPlaylistComponent implements OnInit{
  form!: FormGroup;
  imgPath: string = '';
  auth$ !:Observable<AuthModel | null>
  subscription: Subscription[] = []
  authData: AuthModel | null | undefined
  constructor(
    public dialogRef: MatDialogRef<DialogCreateNewPlaylistComponent>,
    private fb : FormBuilder,
    private store: Store<{
      auth: AuthState }>
  ) {
    this.auth$ = this.store.select('auth','authData')
  }



  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe(authData => {
        if (authData?.uid){
         this.authData = authData
        }

      }),

    )

 if(this.authData?.uid){
   this.form = this.fb.group({
     id: [''],
     name: ['', Validators.required],
     description: ['', Validators.required],
     songs_id: [], // Mảng rỗng ban đầu
     uid: this.authData.uid,
     created_at: [new Date().toISOString()],
     image_url: [null, Validators.required],
     is_pined: [false]
   });
 }
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

    // Kiểm tra kích thước tệp (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.');
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

      if(this.authData?.idToken){
        this.store.dispatch(PlaylistActions.createPlaylist({
          idToken: this.authData.idToken,
          playlist: playlist
        }))
      }

    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
}
