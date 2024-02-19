import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';

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
  @Output() childCreated: EventEmitter<any> = new EventEmitter<any>();

  ngAfterViewInit() {
    this.childCreated.emit(this.itemElement);
  }
}

export class Item {
  private name: string = '';
  private src!: string;
  private price: number = 0;
  private id: number = 0;
  private metal: string = '';
  private collection: string = '';
  private size: string = '';

  constructor(
    name: string,
    price: number,
    id: number,
    src?: string,
    metal?: string,
    collection?: string
  ) {
    this.name = name;
    this.price = price;
    this.id = id;

    if (src) {
      this.src = src;
    }
    if (metal) {
      this.metal = metal;
    }
    if (collection) {
      this.collection = collection;
    }
  }

  setSize(size: string) {
    this.size = size;
  }

  getSize() {
    return this.size;
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
  getMetal() {
    return this.metal;
  }
  getCollection() {
    return this.collection;
  }
}
