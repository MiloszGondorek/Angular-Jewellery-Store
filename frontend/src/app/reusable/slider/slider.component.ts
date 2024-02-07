import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  HostListener,
  AfterContentChecked,
  ViewChildren,
  QueryList,
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
    for (var i = 0; i < 12; i++) {
      const newItem = new Item(i.toString(), 'asd');
      this.items.push(newItem);
    }
  }

  @ViewChildren('child') childs!: QueryList<ElementRef>;

  currentX = 0;
  elementsInRow = 5;

  moveLeft() {
    this.currentX--;
    this.move();
  }

  moveRight() {
    this.currentX++;
    this.move();
  }

  checkPositions() {
    if (this.currentX == 1) {
      this.currentX = -this.items.length + this.elementsInRow;
    }
    if (this.elementsInRow - this.currentX > this.items.length) {
      this.currentX = 0;
    }
  }

  move() {
    this.checkPositions();
    this.childs.forEach((child) => {
      const element = child.nativeElement as HTMLElement;
      element.style.transform = `translateX(calc((100% + 1.25rem) * ${this.currentX} ))`;
    });
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
  onResize() {
    this.setButtonVerticaly();
    this.checkRowCount();
  }

  checkRowCount() {
    if (window.innerWidth >= 1024) {
      this.elementsInRow = 5;
    } else if (window.innerWidth >= 640) {
      this.elementsInRow = 4;
    } else {
      this.elementsInRow = 2;
    }
    this.checkPositions();
    this.move();
  }

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
