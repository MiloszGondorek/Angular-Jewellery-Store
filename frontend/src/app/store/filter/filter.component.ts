import {
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  EventEmitter,
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

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  @ViewChild('checkbox') checkboxRef!: ElementRef;
  isChecked: boolean = false;

  update(checkbox: any, name: string) {
    if (checkbox.checked) {
      this.add.emit(name);
    } else {
      this.remove.emit(name);
    }
  }
}
