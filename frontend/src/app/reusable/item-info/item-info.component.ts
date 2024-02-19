import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from '../item/item.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'item-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.scss',
})
export class ItemInfoComponent implements OnInit {
  @Input() item!: Item;
  @Input() size: string = '';
  name: string = '';
  price: number = 0;
  id: number = 0;
  src: string = '';
  metal: string = '';

  @Output() removeItem: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    if (this.item !== null) {
      this.name = this.item.getName();
      this.price = this.item.getPrice();
      this.src = this.item.getSrc();
      this.id = this.item.getId();
      this.metal = this.item.getMetal();
      this.size = this.item.getSize();
    }
  }
}
