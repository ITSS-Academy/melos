import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../../models/auth.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import * as PlaylistActions from '../../../ngrx/playlist/playlist.actions';
import { PlaylistModel } from '../../../models/playlist.model';

@Component({
  selector: 'app-dialog-edit-playlist',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './dialog-edit-playlist.component.html',
  styleUrl: './dialog-edit-playlist.component.scss',
})
export class DialogEditPlaylistComponent implements OnInit {
  form!: FormGroup;
  imgPath: string = '';
  auth$!: Observable<AuthModel | null>;
  subscription: Subscription[] = [];
  authData: AuthModel | null | undefined;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { name: string; img: string; description: string },
    private store: Store<{ auth: AuthState }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((authData) => {
        if (authData?.idToken) {
          this.authData = authData;
        }
      }),
    );

    this.form = this.fb.group({
      uid: [''],
      id: [''],
      file: [null],
      image_url: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Gán dữ liệu vào form nếu có
    if (this.data) {
      this.form.patchValue({
        name: this.data.name || '',
        description: this.data.description || '',
        image_url: this.data.img || '',
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

    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgPath = e.target.result;
      this.form.patchValue({ image_url: this.imgPath });
    };
    reader.readAsDataURL(file);
  }

  savePlaylist() {
    if (this.form.valid) {
      const playlist: PlaylistModel = this.form.value;
      console.log('🎵 Dữ liệu gửi đi:', playlist); // ✅ Kiểm tra dữ liệu
      if (this.authData?.idToken) {
        this.store.dispatch(
          PlaylistActions.editPlaylistById({
            idToken: this.authData.idToken,
            playlist: playlist,
          }),
        );
      }
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
}
