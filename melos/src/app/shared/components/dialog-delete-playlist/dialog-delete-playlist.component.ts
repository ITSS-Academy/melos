import {Component, Inject, Input} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-delete-playlist',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-delete-playlist.component.html',
  styleUrl: './dialog-delete-playlist.component.scss'
})
export class DialogDeletePlaylistComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, name: string }) {}
}
