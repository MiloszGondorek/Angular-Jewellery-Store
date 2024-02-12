import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  AfterContentInit,
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
