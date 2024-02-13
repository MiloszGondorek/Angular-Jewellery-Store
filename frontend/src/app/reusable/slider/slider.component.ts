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
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  @ViewChildren('child') childs!: QueryList<ElementRef>;

  topPx: number | undefined;
  showArrows: boolean = true;
  items: Item[] = [];

  ngOnInit(): void {
    if (this.bestsellers) {
      this.generateBestsellers();
    } else {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        this.generateRelative(id);
      });
    }
  }
  ngAfterViewChecked() {
    this.setButtonMt();
  }

  async getItem(itemId: any) {
    const data: any = await http.getData(`items/${itemId}?populate=*`);
    const imgUrl =
      http.getURL() + data.attributes.MainImage.data.attributes.url;
    const title = data.attributes.Name;
    const price = data.attributes.Price;
    const id = data.id;
    const newItem = new Item(title, imgUrl, price, id);
    this.items.push(newItem);
    this.checkRowCount();
  }

  async generateBestsellers() {
    const data: any = await http.getData(`bestseller?populate=*`);

    data.attributes.items.data.forEach((element: any) => {
      const item = element.id;
      this.getItem(item);
    });
  }

  async generateRelative(id: any) {
    //items?populate=*&filters[collection][id][$ne]=1&filters[category][id]=1 zapytanie o itemy z kolekcji
    const data: any = await http.getData(`items/${id}?populate=*`);
    const collection = data.attributes.collection.data;

    let itemsInList = 0;
    let itemsIds: any = [];
    const itemLimit = 10;

    if (collection !== null) {
      const itemInCollection: any = await http.getData(
        `items?populate=*&filters[collection][id]=${collection.id}&filters[id][$ne]=${id}`
      );
      itemInCollection.forEach((element: any) => {
        const itemId = element.id;
        this.getItem(itemId);
        itemsIds.push(itemId);
        itemsInList++;
      });
    } else {
      console.log('NIE MA KOLEKCJI');
    }
    if (itemsInList < itemLimit) {
      const category = data.attributes.category.data;
      const itemsInCategory: any = await http.getData(
        `items?populate=*&filters[category][id]=${category.id}&filters[id][$ne]=${id}`
      );
      console.log(itemsInCategory);
      for (let item of itemsInCategory) {
        const itemId = item.id;
        if (!itemsIds.includes(itemId)) {
          this.getItem(itemId);
          itemsInList++;
        }
        if (itemsInList >= itemLimit) break;
      }
    }
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
