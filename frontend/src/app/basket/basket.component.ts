import { Component, OnInit } from '@angular/core';
import { ItemInfoComponent } from '../reusable/item-info/item-info.component';
import { Item } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../reusable/button/button.component';
import { ServerData, ServerItem, http } from '../../httpConnection';
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
  price: number = 0;
  deliverPrice: number = 17;
  showInfo = false;
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
    this.price = 0;
    newBasket.forEach((item) => {
      const newItem = new BasketItemData(item.sizeId, item.item.getId());
      basketData.push(newItem);
      this.price += item.item.getPrice();
    });
    const json = JSON.stringify(basketData);
    Storage.setData('basket', json);
  }

  Buy() {
    if (this.items.length > 0) {
      this.items = [];
      this.showInfo = true;
      this.removeItem(0);
    }
  }

  hideInfo() {
    this.showInfo = false;
  }

  async getItemData(id: number, size: number) {
    const data: ServerItem = ServerData.getItems(id.toString())[0];

    if (Object.keys(data).length > 0) {
      const price = data.price;
      this.price += price;

      const name = data.name;
      const serverURL = http.getURL();
      const src = serverURL + data.MainImage;
      const metal = ServerData.getMetal()[data.metalId].name;
      const newItem = new Item(name, price, id, src, metal);

      const catId = data.categoryId;
      const itemSize: any = this.getSize(catId, size);
      if (itemSize !== undefined) {
        newItem.setSize(itemSize);
      }

      const newBasket = new BasketItem(newItem, BasketItem.getIds(), size);
      this.items.push(newBasket);
    }
  }

  getSize(catId: number, id: number) {
    const sizeRequest = ServerData.getCategories()[catId].sizes;
    if (sizeRequest !== undefined) {
      return sizeRequest[id];
    }
    return undefined;
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
