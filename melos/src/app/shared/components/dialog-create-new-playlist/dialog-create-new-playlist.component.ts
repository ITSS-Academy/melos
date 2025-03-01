import { Component } from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MatDialogRef} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-dialog-create-new-playlist',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './dialog-create-new-playlist.component.html',
  styleUrl: './dialog-create-new-playlist.component.scss'
})
export class DialogCreateNewPlaylistComponent{
  constructor(
    public dialogRef: MatDialogRef<DialogCreateNewPlaylistComponent>,

  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  myForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  onSubmit() {
    console.log('Form Data:', this.myForm.value);
  }
}
