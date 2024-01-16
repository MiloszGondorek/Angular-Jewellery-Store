import { Component, Input } from '@angular/core';

@Component({
  selector: 'pros',
  standalone: true,
  imports: [],
  templateUrl: './pros.component.html',
  styleUrl: './pros.component.scss',
})
export class ProsComponent {
  @Input() link = '';
  @Input() header = '';
  @Input() desc = '';
}
