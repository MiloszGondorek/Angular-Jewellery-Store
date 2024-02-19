import { Component, OnInit } from '@angular/core';
import { ItemInfoComponent } from '../reusable/item-info/item-info.component';
import { Item } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../reusable/button/button.component';
import { http } from '../../httpConnection';
import { Storage } from '../../storage';
@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [ItemInfoComponent, CommonModule, ButtonComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss',
})
export class BasketComponent implements OnInit {
  items: BasketItem[] = [];
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const jsonData = Storage.getData('basket');
    const data = JSON.parse(jsonData);
    data.forEach((item: any) => {
      this.getItemData(item.id, item.sizeId);
    });
  }

  removeItem(id: number) {
    const newBasket = this.items.filter((a) => a.id != id);
    this.items = newBasket;
    const basketData: BasketItemData[] = [];
    newBasket.forEach((item) => {
      const newItem = new BasketItemData(item.sizeId, item.item.getId());
      basketData.push(newItem);
    });
    const json = JSON.stringify(basketData);
    Storage.setData('basket', json);
  }

  async getItemData(id: number, size: number) {
    const request = `items/${id}?populate=*`;
    const data: any = await http.getData(request);

    if (Object.keys(data).length > 0) {
      const price = data.attributes.Price;
      const name = data.attributes.Name;
      const serverURL = http.getURL();
      const src = serverURL + data.attributes.MainImage.data.attributes.url;
      const metal = data.attributes.metal.data.attributes.Name;
      const newItem = new Item(name, price, id, src, metal);
      newItem.setSize(data.attributes.Size[size].Size);

      const newBasket = new BasketItem(newItem, BasketItem.getIds(), size);
      this.items.push(newBasket);
    }
  }
}

class BasketItem {
  item!: Item;
  id!: number;
  sizeId!: number;
  static ids: number = -1;

  constructor(item: Item, id: number, sizeId: number) {
    this.item = item;
    this.id = id;
    this.sizeId = sizeId;
  }

  static getIds() {
    this.ids++;
    return this.ids;
  }
}

export class BasketItemData {
  private sizeId!: number;
  private id!: number;
  constructor(sizeId: any, itemId: number) {
    this.sizeId = sizeId;
    this.id = itemId;
  }

  getSizeId() {
    return this.sizeId;
  }

  getId() {
    return this.id;
  }
}
