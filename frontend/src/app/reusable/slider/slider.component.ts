import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
  AfterContentChecked,
  ViewChildren,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Item, ItemComponent } from '../item/item.component';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements AfterContentChecked {
  @Input() header = '';
  @Input() theme = 'light';

  @ViewChild('containerElement', { static: false })
  containerElement!: ElementRef;

  topPx: number | undefined;
  items: Item[] = [];

  constructor() {
    for (var i = 0; i < 5; i++) {
      const newItem = new Item(i * 7);
      this.items.push(newItem);
    }
  }

  ngAfterContentChecked(): void {
    if (this.containerElement) {
      Slider.setF((x: any) => {
        this.set(x);
      });
      this.setButtonVerticaly();
    }
  }

  set(x: any) {
    this.topPx = x.nativeElement.offsetWidth / 2;
  }

  @HostListener('window:resize', ['$event'])
  setButtonVerticaly() {
    Slider.callF();
  }
}

export class Slider {
  static element: any;
  static f: Function | undefined;

  static setF(newF: Function) {
    this.f = newF;
  }

  static callF() {
    if (this.f) this.f(this.element);
  }

  static setElement(x: any) {
    this.element = x;
    this.callF();
  }

  static getElement() {
    return this.element;
  }
}
