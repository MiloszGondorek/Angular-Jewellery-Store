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
  name: string = '';
  src: string = '';
  constructor(num: string, src: string) {
    this.name = num;
    this.src = src;
  }
  getName() {
    return this.name;
  }
  getSrc() {
    return this.src;
  }
}
