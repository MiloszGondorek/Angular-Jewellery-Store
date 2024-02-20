import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { Item, ItemComponent } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';
import { SelectComponent, Select } from '../reusable/select/select.component';
import { http } from '../../httpConnection';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [FilterComponent, ItemComponent, CommonModule, SelectComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent implements OnInit {
  data = ['rings', 'bracelets', 'earrings', 'necklaces'];
  metals: string[] = [];
  collections: string[] = [];

  httpCollection: string = '';

  selectedMetals: string[] = [];
  selectedCollections: string[] = [];

  header = '';
  description!: string;
  src = '../../assets/images/rings-bg.png';
  items: Item[] = [];
  visibleItems: Item[] = [];
  sortData: Select[] = [
    new Select('Price (up)'),
    new Select('Price (down)'),
    new Select('Name (up)'),
    new Select('Name (down)'),
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const category = this.route.snapshot.params['category'];
    const collection = this.route.snapshot.params['collection'];
    if (!this.data.includes(category) && category != 'all') {
      this.router.navigateByUrl('/home');
    }
    this.header = category;
    const id = this.route.snapshot.paramMap.get('category');
    if (category != 'all') {
      this.getData(id);
    } else {
      this.getData();
      this.description =
        'Indulge in a stunning collection of jewelry, featuring rings, necklaces, earrings, and bracelets. From timeless rings symbolizing love to elegant necklaces framing the neckline, each piece adds a touch of sophistication. Elevate your style with earrings that sparkle and bracelets that charm, expressing your individuality with every adornment. Discover the perfect piece to complement any outfit and make a statement with our exquisite selection of jewelry.';
    }

    if (collection !== undefined) {
      this.httpCollection = collection;
      this.addCollection(collection);
    }
    this.metals = Metal.getMetals();
    this.collections = Collections.getCollections();
  }

  sortItems(id?: any) {
    if (id >= 0) {
      Sort.sortData(id, this.items);
    }
    this.visibleItems = this.items;
    this.visibleItems = Sort.SortByMetal(
      this.selectedMetals,
      this.visibleItems
    );
    this.visibleItems = Sort.SortByCollection(
      this.selectedCollections,
      this.visibleItems
    );
  }

  addMetal(metal: string) {
    if (this.selectedMetals.findIndex((a) => a == metal) == -1) {
      this.selectedMetals.push(metal);
      this.sortItems();
    }
  }

  removeMetal(metal: string) {
    const id = this.selectedMetals.findIndex((a) => a == metal);
    if (id != -1) {
      this.selectedMetals.splice(id, 1);
      this.sortItems();
    }
  }

  addCollection(collection: string) {
    if (this.selectedCollections.findIndex((a) => a == collection) == -1) {
      this.selectedCollections.push(collection);
      this.sortItems();
    }
  }

  removeCollection(collection: string) {
    const id = this.selectedCollections.findIndex((a) => a == collection);
    if (id != -1) {
      this.selectedCollections.splice(id, 1);
      this.sortItems();
    }
  }

  async getData(id?: any) {
    let request =
      'items?populate[0]=MainImage&populate[1]=collection&populate[2]=metal';
    if (id) {
      request += `&filters[category][Name][$eq]=${id}`;
    }
    const data = await http.getData(request);
    if (id) {
      const categoryReq = `categories?filters[Name][$eq]=${id}`;
      const category = await http.getData(categoryReq);
      this.description = category[0].attributes.Description;
    }
    data.forEach((element: any) => {
      const imgUrl =
        http.getURL() + element.attributes.MainImage.data.attributes.url;
      const title = element.attributes.Name;
      const price = element.attributes.Price;
      const id = element.id;
      const metal = element.attributes.metal.data.attributes.Name;
      let newItem: Item;
      if (element.attributes.collection.data !== null) {
        const collection = element.attributes.collection.data.attributes.Title;
        newItem = new Item(title, price, id, imgUrl, metal, collection);
      } else {
        newItem = new Item(title, price, id, imgUrl, metal);
      }
      this.items.push(newItem);
    });
    this.sortItems(0);
  }
}

class Sort {
  private static lastId: number;

  static sortData(sortId: number, sortData: Item[]) {
    if (this.lastId != sortId) {
      // 0 - Price up
      // 1 - Price down
      // 2 - Name up
      // 3 - Name down
      switch (sortId) {
        case 0:
          sortData.sort((a, b) => a.getPrice() - b.getPrice());
          break;
        case 1:
          sortData.sort((a, b) => b.getPrice() - a.getPrice());
          break;

        case 2:
          sortData.sort((a, b) => a.getName().localeCompare(b.getName()));
          break;

        case 3:
          sortData.sort((a, b) => b.getName().localeCompare(a.getName()));
          break;
      }
      this.lastId = sortId;
    }
  }

  static SortByMetal(selectedMetals: string[], sortData: Item[]) {
    if (selectedMetals.length > 0) {
      return sortData.filter((a) => selectedMetals.includes(a.getMetal()));
    }
    return sortData;
  }

  static SortByCollection(selectedCollection: string[], sortData: Item[]) {
    if (selectedCollection.length > 0) {
      return sortData.filter((a) =>
        selectedCollection.includes(a.getCollection())
      );
    }
    return sortData;
  }
}

class Metal {
  private static metals: string[] = [];
  static getMetals() {
    this.setMetals();
    return this.metals;
  }

  static async setMetals() {
    const data = await http.getData(`metals`);
    data.forEach((element) => {
      this.metals.push(element.attributes.Name);
    });
  }
}

class Collections {
  private static collections: string[] = [];

  static getCollections() {
    this.getData();
    return this.collections;
  }

  static async getData() {
    const data = await http.getData(`collections`);
    data.forEach((element) => {
      this.collections.push(element.attributes.Title);
    });
  }
}
