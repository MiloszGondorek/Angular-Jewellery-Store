import {
  Component,
  Input,
  AfterContentChecked,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Slider } from '../slider/slider.component';

@Component({
  selector: 'item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements AfterViewInit {
  @Input() src = '';
  @Input() name = '';
  @Input() price = 0;

  @ViewChild('itemElement', { static: false })
  itemElement!: ElementRef;
  ngAfterViewInit(): void {
    Slider.setElement(this.itemElement);
  }
}

export class Item {
  name = 123;
  constructor(num: number) {
    this.name = num;
  }
  getName() {
    return this.name;
  }
  static generate() {
    return this.name;
  }
}
