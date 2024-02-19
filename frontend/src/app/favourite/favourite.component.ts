import { Component } from '@angular/core';
import { ItemInfoComponent } from '../reusable/item-info/item-info.component';
import { Item } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';
import { Storage } from '../../storage';
import { http } from '../../httpConnection';

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

  async getItemData(id: number) {
    const request = `items/${id}?populate=*`;
    const data: any = await http.getData(request);

    if (Object.keys(data).length > 0) {
      const price = data.attributes.Price;
      const name = data.attributes.Name;
      const serverURL = http.getURL();
      const src = serverURL + data.attributes.MainImage.data.attributes.url;
      const metal = data.attributes.metal.data.attributes.Name;
      const newItem = new Item(name, price, id, src, metal);
      this.items.push(newItem);
    }
  }
}
