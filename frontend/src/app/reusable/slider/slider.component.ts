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

import {
  ServerCollection,
  ServerData,
  ServerItem,
} from '../../../httpConnection';
import { CommonModule } from '@angular/common';
import { Item, ItemComponent } from '../item/item.component';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private cdr: ChangeDetectorRef, private route: ActivatedRoute) {}
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

  getItem(itemId: any) {
    const data: ServerItem = ServerData.getItems(itemId)[0];
    const imgUrl = data.MainImage;
    const title = data.name;
    const price = data.price;
    const id = data.id;
    const newItem = new Item(title, price, id, imgUrl);
    this.items.push(newItem);
    this.checkRowCount();
  }

  generateBestsellers() {
    const data: number[] = ServerData.getBestsellers();
    data.forEach((id: any) => {
      this.getItem(id);
    });
  }

  generateRelative(id: any) {
    const data: ServerItem = ServerData.getItems(id)[0];
    let itemsInList = 0;
    let itemsIds: any = [];
    const itemLimit = 10;

    if (data.collectionId !== null) {
      const itemInCollection: ServerItem[] = ServerData.getItems().filter(
        (a) => a.collectionId == data.collectionId && a.id != data.id
      );
      itemInCollection.forEach((element: any) => {
        const itemId = element.id;
        this.getItem(itemId);
        itemsIds.push(itemId);
        itemsInList++;
      });
    }
    if (itemsInList < itemLimit) {
      const category = data.categoryId;
      const itemsInCategory: ServerItem[] = ServerData.getItems().filter(
        (a) => a.categoryId == category && a.id != id
      );
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
    if (this.childs !== undefined) {
      this.childs.forEach((child) => {
        const element = child.nativeElement as HTMLElement;
        element.style.transform = `translateX(calc((100% + 1.25rem) * ${this.currentX} ))`;
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setButtonMt();
    this.checkRowCount();
  }

  checkRowCount() {
    if (window !== undefined) {
      if (window.innerWidth >= 1024) {
        this.elementsInRow = 5;
      } else if (window.innerWidth >= 640) {
        this.elementsInRow = 4;
      } else {
        this.elementsInRow = 2;
      }

      this.showArrows = this.items.length > this.elementsInRow;
    }
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
