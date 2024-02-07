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
  @Input() id = 0;

  @ViewChild('itemElement', { static: false })
  itemElement!: ElementRef;
  ngAfterViewInit(): void {
    Slider.setElement(this.itemElement);
  }
}

export class Item {
  name: string = '';
  src: string = '';
  price: number = 0;
  id: number = 0;

  constructor(num: string, src: string, price: number, id: number) {
    this.name = num;
    this.src = src;
    this.price = price;
    this.id = id;
  }
  getName() {
    return this.name;
  }
  getSrc() {
    return this.src;
  }
  getPrice() {
    return this.price;
  }
  getId() {
    return this.id;
  }
}
