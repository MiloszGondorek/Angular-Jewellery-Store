import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';
import { ButtonComponent } from '../reusable/button/button.component';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [InfoComponent,ButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
