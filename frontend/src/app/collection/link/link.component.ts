import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../reusable/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
})
export class LinkComponent {
  @Input() header = '';
  @Input() desc = '';
  @Input() src = '';
  @Input() flotRight = false;
}
