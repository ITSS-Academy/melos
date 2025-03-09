import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { SongModel } from '../../models/song.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../models/auth.model';
import * as SongActions from '../../ngrx/song/song.actions';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { SongState } from '../../ngrx/song/song.state';
import { CategoryModel } from '../../models/category.model';
import { CategoryState } from '../../ngrx/category/category.state';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DialogLoginComponent } from '../../shared/components/dialog-login/dialog-login.component';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoadingComponent,
    AsyncPipe,
    DialogLoginComponent,
    MaterialModule,
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
  categoryIdTemp: string = '';
  selectedFile: File | null = null;
  selectedImage: string | null = null;

  fileUploadForm = new FormGroup({
    audioFile: new FormControl<File | null>(null, Validators.required),
  });

  trackInforForm = new FormGroup({
    coverImage: new FormControl<File | null>(null, Validators.required),
    title: new FormControl('', Validators.required),
    artist: new FormControl('', Validators.required),
    category_name: new FormControl('', Validators.required),
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
          this.trackInforForm.controls['category_id'].updateValueAndValidity();
          this.trackInforForm.controls['category_name'].setValidators([
            Validators.required,
            this.matchListValidator(this.cateGoryList, 'category_id'),
          ]);
          this.trackInforForm.controls[
            'category_name'
          ].updateValueAndValidity();

          // console.log('categories:', this.cateGoryList);
        }
      }),
    );

    this.fileUploadForm.valueChanges.subscribe(() =>
      this.checkFormCompletion(),
    );
    this.trackInforForm.valueChanges.subscribe(() =>
      this.checkFormCompletion(),
    );

    this.category$ = this.trackInforForm.controls[
      'category_name'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value ? value.toString() : '')),
    );
  }

  private _filter(value: string): CategoryModel[] {
    if (!this.cateGoryList || !Array.isArray(this.cateGoryList)) {
      return [];
    }

    const filterValue = value.trim().toLowerCase();

    // Nếu value rỗng, trả về toàn bộ danh sách thay vì lọc
    return filterValue
      ? this.cateGoryList.filter((option) =>
          option.name?.toLowerCase().includes(filterValue),
        )
      : this.cateGoryList;
  }

  onCategorySelected(event: MatAutocompleteSelectedEvent) {
    const selectedName = event.option.value; // Giá trị name
    const selectedCategory = this.cateGoryList.find(
      (cat) => cat.name === selectedName,
    ); // Tìm category
    if (selectedCategory) {
      this.trackInforForm.patchValue({
        category_id: selectedCategory.id,
        category_name: selectedCategory.name,
      });
    }
  }

  confirmForm() {
    this.formData = {
      file_path: this.fileUploadForm.value.audioFile ?? '',
      image_url: this.trackInforForm.value.coverImage ?? '',
      title: this.trackInforForm.value.title ?? '',
      performer: this.trackInforForm.value.artist ?? '',
      category_id: this.trackInforForm.value.category_id ?? '',
      composer: this.trackInforForm.value.description ?? '',
      views: 0,
      uuid: this.authData?.uid ?? '',
      id: '',
      createdAt: new Date().toISOString(),
      duration: 0,
    };

    if (this.authData?.idToken) {
      this.store.dispatch(
        SongActions.createSong({
          song: this.formData,
          idToken: this.authData?.idToken ?? '',
        }),
      );
    }

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
      'audio/mp3',
    ];

    // (GB -> MB -> KB -> Bytes)
    const maxFileSize = 4 * 1024 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert(
        'Invalid file type! Please upload an MP3, WAV, FLAC, AIFF, or ALAC file.',
      );
      input.value = ''; // Reset input file
      return;
    }

    if (file.size > maxFileSize) {
      alert('File is too large! Maximum allowed size is 4GB.');
      input.value = ''; // Reset input file
      return;
    }

    this.selectedFile = file;
    this.fileUploadForm.patchValue({ audioFile: file });
    this.fileUploadForm.get('audioFile')?.updateValueAndValidity();

    // // Reset input file để chọn lại file khác
    // input.value = '';
  }

  // Chọn ảnh bìa

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const maxFileImg = 3 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      alert('Chỉ chấp nhận ảnh JPG hoặc PNG.');
      input.value = '';
      return;
    }

    if (file.size > maxFileImg) {
      alert(
        'The image file is too large! Please select an image with a maximum size of 3MB.',
      );
      input.value = ''; // Reset input file
      return;
    }

    this.selectedImage = URL.createObjectURL(file);
    this.trackInforForm.patchValue({ coverImage: file });
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
        category: this.trackInforForm.value.category_name,
        category_id: this.trackInforForm.value.category_id,
        description: this.trackInforForm.value.description,
      });
    }
  }

  matchListValidator(list: any[], idControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const match = list.some((item) => item.name === value);
      if (!match) {
        (this.trackInforForm.get(idControlName) as FormControl).setValue('');
      }
      return match ? null : { matchList: true };
    };
  }
}
