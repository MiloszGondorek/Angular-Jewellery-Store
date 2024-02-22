import { Component } from '@angular/core';
import { ItemInfoComponent } from '../reusable/item-info/item-info.component';
import { Item } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';
import { Storage } from '../../storage';
import { ServerData, ServerItem, http } from '../../httpConnection';

@Component({
  selector: 'app-favourite',
  standalone: true,
  imports: [ItemInfoComponent, CommonModule],
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.scss',
})
export class FavouriteComponent {
  items: Item[] = [];
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    const jsonData = Storage.getData('fav');
    const data = JSON.parse(jsonData);
    data.forEach((item: number) => {
      this.getItemData(item);
    });
  }

  removeFromFav(id: number) {
    const removeId = this.items.findIndex((a) => a.getId() == id);
    this.items.splice(removeId, 1);
    let itemsIds = [];
    for (let item of this.items) {
      itemsIds.push(item.getId());
    }
    const json = JSON.stringify(itemsIds);
    Storage.setData('fav', json);
  }

  getItemData(id: number) {
    const data: ServerItem = ServerData.getItems(id.toString())[0];

    if (data !== undefined) {
      const price = data.price;
      const name = data.name;
      const serverURL = http.getURL();
      const src = serverURL + data.MainImage;
      const metal = ServerData.getMetal()[data.metalId].name;
      const newItem = new Item(name, price, id, src, metal);
      this.items.push(newItem);
    }
  }
}
