import { Component } from '@angular/core';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [InfoComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
