import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-border',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text = '';
  @Input() link = '';
}
