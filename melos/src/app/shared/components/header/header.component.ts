import {Component, Input} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
