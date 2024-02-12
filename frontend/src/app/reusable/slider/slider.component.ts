import {
  Component,
  ElementRef,
  Input,
  HostListener,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
  AfterViewChecked,
  OnInit,
} from '@angular/core';

import { http } from '../../../httpConnection';
import { CommonModule } from '@angular/common';
import { Item, ItemComponent } from '../item/item.component';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [ItemComponent, CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit, AfterViewChecked {
  @Input() header = '';
  @Input() theme = 'light';
  @Input() bestsellers = false;

  constructor(private cdr: ChangeDetectorRef) {}
  @ViewChildren('child') childs!: QueryList<ElementRef>;

  topPx: number | undefined;
  showArrows: boolean = true;
  items: Item[] = [];

  ngOnInit(): void {
    if (this.bestsellers) {
      this.generate();
    } else {
      for (var i = 0; i < 12; i++) {
        const newItem = new Item(i.toString(), 'asd', 1, 1);
        this.items.push(newItem);
      }
    }
  }
  ngAfterViewChecked() {
    this.setButtonMt();
  }

  async generate() {
    const data = await http.getData(
      `items?populate=*&filters[category][Name][$eq]=rings`
    );

    data.forEach((element: any) => {
      const imgUrl =
        http.getURL() + element.attributes.MainImage.data.attributes.url;
      const title = element.attributes.Name;
      const price = element.attributes.Price;
      const id = element.id;
      const newItem = new Item(title, imgUrl, price, id);
      this.items.push(newItem);
    });
    this.checkRowCount();
  }

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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setButtonMt();
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

    this.showArrows = this.items.length > this.elementsInRow;

    this.checkPositions();
    this.move();
  }

  element: any;
  setElement(element: any) {
    this.element = element;
  }

  setButtonMt() {
    if (this.element != undefined) {
      this.topPx = this.element.nativeElement.offsetHeight / 2;
      this.cdr.detectChanges();
    }
  }
}
