import {
  Component,
  Input,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() header = '';
  @Input() filter!: any[];
  @Input() startedCollection: string = '';

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  isChecked: boolean = false;

  update(checkbox: any, name: string) {
    if (checkbox.checked) {
      this.add.emit(name);
    } else {
      this.remove.emit(name);
    }
  }
}
