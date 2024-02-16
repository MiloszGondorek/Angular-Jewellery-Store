import { Component, OnInit } from '@angular/core';
import { ItemInfoComponent } from '../reusable/item-info/item-info.component';
import { Item } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../reusable/button/button.component';
@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [ItemInfoComponent, CommonModule, ButtonComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  items: Item[] = [];
  ngOnInit(): void {
    for (let i = 1; i <= 5; i++) {
      const newItem = new Item(
        'Luna Diamentów',
        350,
        i,
        'http://localhost:1337/uploads/item_1_1049144ce4.png'
      );
      this.items.push(newItem);
    }
  }
}
