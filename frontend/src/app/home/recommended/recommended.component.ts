import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recommended',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.scss',
})
export class RecommendedComponent {
  @Input() src = '';
  @Input() isLarge = true;
  @Input() header = '';
  @Input() link='';
}
