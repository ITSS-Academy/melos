import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { SongModel } from '../../models/song.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../models/auth.model';
import * as SongActions from '../../ngrx/song/song.actions';

import {
  ProgressSpinnerMode,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { SongState } from '../../ngrx/song/song.state';
import { CategoryModel } from '../../models/category.model';
import { CategoryState } from '../../ngrx/category/category.state';

import * as CategoryActions from '../../ngrx/category/category.actions';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatRadioModule,
    MatCardModule,
    LoadingComponent,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit, OnDestroy {
  formData: SongModel = {} as SongModel;
  subscription: Subscription[] = [];
  auth$!: Observable<AuthModel | null>;
  authData: AuthModel | null = null;
  isLoading$!: Observable<boolean>;
  category$!: Observable<CategoryModel[]>;
  cateGoryList: CategoryModel[] = [];

  @ViewChild('stepper') stepper!: MatStepper;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;

  selectedFile: File | null = null;
  selectedImage: string | null = null;

  // other: string[] = [
  //   'Pop',
  //   'Jazz',
  //   'Rock',
  //   'Latin',
  //   'Dance',
  //   'Ballad',
  //   'EDM',
  //   'Country',
  // ];

  fileUploadForm = new FormGroup({
    audioFile: new FormControl<File | null>(null, Validators.required),
  });

  trackInforForm = new FormGroup({
    coverImage: new FormControl<File | null>(null, Validators.required),
    title: new FormControl('', Validators.required),
    artist: new FormControl('', Validators.required),
    // other: new FormControl('', Validators.required),
    category_id: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private store: Store<{
      auth: AuthState;
      song: SongState;
      category: CategoryState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.isLoading$ = this.store.select('song', 'isLoading');
    this.category$ = this.store.select('category', 'categoryList'); // Lấy danh sách thể loại từ Store

    this.store.dispatch(CategoryActions.getCategoryList());
  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.idToken) {
          this.authData = auth;
        }
      }),

      this.category$.subscribe((categories) => {
        if (categories.length > 0) {
          this.cateGoryList = categories;
          console.log('categories:', this.cateGoryList);
        }
      }),
    );

    this.fileUploadForm.valueChanges.subscribe(() =>
      this.checkFormCompletion(),
    );
    this.trackInforForm.valueChanges.subscribe(() =>
      this.checkFormCompletion(),
    );
  }

  confirmForm() {
    this.formData = {
      file_path: this.fileUploadForm.value.audioFile ?? '',
      image_url: this.trackInforForm.value.coverImage ?? '',
      title: this.trackInforForm.value.title ?? '',
      performer: this.trackInforForm.value.artist ?? '',
      // category_id: this.trackInforForm.value.other ?? '',
      category_id: this.trackInforForm.value.category_id ?? '',
      composer: this.trackInforForm.value.description ?? '',
      views: 0,
      uuid: this.authData?.uid ?? '',
      id: '1' ?? '',
      createdAt: new Date().toISOString(),
    };

    // if (this.authData?.idToken) {
    //   this.store.dispatch(
    //     SongActions.createSong({
    //       song: this.formData,
    //       idToken: this.authData?.idToken ?? '',
    //     }),
    //   );
    // }

    console.log('formData:', this.formData);
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  // Chọn file nhạc
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const allowedTypes = [
      'audio/mpeg',
      'audio/wav',
      'audio/flac',
      'audio/aiff',
      'audio/x-aiff',
      'audio/x-alac',
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        'Invalid file type! Please upload an MP3, WAV, FLAC, AIFF, or ALAC file.',
      );
      input.value = ''; // Reset input file
      return;
    }

    this.selectedFile = file;
    this.fileUploadForm.patchValue({ audioFile: file });
    this.fileUploadForm.get('audioFile')?.updateValueAndValidity();

    // Reset input file để chọn lại file khác
    input.value = '';
  }

  // Chọn ảnh bìa
  // onImageSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //     // this.fileUploadForm.patchValue({ coverImage: file });
  //     this.trackInforForm.patchValue({ coverImage: file });
  //
  //   }
  // }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.selectedImage = URL.createObjectURL(file);
      this.trackInforForm.patchValue({ coverImage: file });
    }
  }

  // Reset form
  resetForm() {
    this.fileUploadForm.reset();
    this.selectedFile = null;
    this.selectedImage = null;

    // Reset giá trị của input file và input ảnh
    if (this.fileInput) this.fileInput.nativeElement.value = '';
    if (this.imageInput) this.imageInput.nativeElement.value = '';

    // Reset lại stepper
    if (this.stepper) this.stepper.reset();
  }

  // Mở hộp chọn file
  openFileChooser() {
    this.fileInput.nativeElement.click();
  }

  openImageChooser() {
    this.imageInput.nativeElement.click();
  }

  // Xử lý kéo thả
  onDragOver(event: Event) {
    event.preventDefault();
  }

  onDropFile(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
      this.fileUploadForm.patchValue({ audioFile: this.selectedFile });
    }
  }

  onDropImage(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
      // this.fileUploadForm.patchValue({ coverImage: file });
      this.trackInforForm.patchValue({ coverImage: file });
    }
  }

  checkFormCompletion() {
    if (this.fileUploadForm.valid && this.trackInforForm.valid) {
      console.log('Thông tin bài hát:', {
        audioFile: this.fileUploadForm.value.audioFile,
        coverImage: this.trackInforForm.value.coverImage,
        title: this.trackInforForm.value.title,
        artist: this.trackInforForm.value.artist,
        // other: this.trackInforForm.value.other,
        category: this.trackInforForm.value.category_id,
        description: this.trackInforForm.value.description,
      });
    }
  }

  // private _formBuilder = inject(FormBuilder);
  //
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  // isEditable = false;
  //
  //
  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  // @ViewChild('imageInput') imageInput!: ElementRef<HTMLInputElement>;
  //
  // selectedFile: File | null = null;
  // selectedImage: string | null = null;
  //
  // // Mở hộp thoại chọn file
  // openFileChooser() {
  //   this.fileInput.nativeElement.click();
  // }
  //
  // openImageChooser() {
  //   this.imageInput.nativeElement.click();
  // }
  //
  // // Xử lý khi người dùng chọn file
  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //     console.log('File selected:', this.selectedFile.name);
  //   }
  // }
  //
  // // Xử lý khi người dùng chọn ảnh
  // onImageSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  //
  // // Kéo thả file
  // onDragOver(event: DragEvent) {
  //   event.preventDefault();
  // }
  //
  // onDropFile(event: DragEvent) {
  //   event.preventDefault();
  //   if (event.dataTransfer?.files.length) {
  //     this.selectedFile = event.dataTransfer.files[0];
  //     console.log('File dragged:', this.selectedFile.name);
  //   }
  // }
  //
  // onDropImage(event: DragEvent) {
  //   event.preventDefault();
  //   if (event.dataTransfer?.files.length) {
  //     const file = event.dataTransfer.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
}
