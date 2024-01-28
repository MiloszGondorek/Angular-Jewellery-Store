import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'star',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss',
})
export class StarComponent {
  @Input() desc = '';
  @Input() count = 0;
  @Input() max = 1;
}
