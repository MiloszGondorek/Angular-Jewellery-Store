import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../item/item.component';
@Component({
  selector: 'item-info',
  standalone: true,
  imports: [],
  templateUrl: './item-info.component.html',
  styleUrl: './item-info.component.scss',
})
export class ItemInfoComponent implements OnInit {
  @Input() item!: Item;
  name: string = '';
  price: number = 0;
  id: number = 0;
  src: string = '';

  ngOnInit(): void {
    if (this.item !== null) {
      this.name = this.item.getName();
      this.price = this.item.getPrice();
      this.src = this.item.getSrc();
      this.id = this.item.getId();
    }
  }
}
