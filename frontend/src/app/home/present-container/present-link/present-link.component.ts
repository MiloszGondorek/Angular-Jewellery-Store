import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'present-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './present-link.component.html',
  styleUrl: './present-link.component.scss',
})
export class PresentLinkComponent {
  @Input() link = '';
  @Input() src = '';
  @Input() header = '';
  @Input() isLarge=true;
}
