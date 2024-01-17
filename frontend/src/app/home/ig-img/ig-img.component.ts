import { Component, Input } from '@angular/core';

@Component({
  selector: 'ig-img',
  standalone: true,
  imports: [],
  templateUrl: './ig-img.component.html',
  styleUrl: './ig-img.component.scss',
})
export class IgImgComponent {
  @Input() src = '';
}
