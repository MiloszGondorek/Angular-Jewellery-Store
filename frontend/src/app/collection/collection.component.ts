//collection.component.ts

import { Component, OnInit } from '@angular/core';
import { LinkComponent } from './link/link.component';
import { CommonModule } from '@angular/common';
import { ServerData, http } from '../../httpConnection';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [LinkComponent, CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  collections: Array<Collection> = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const data: any = ServerData.getCollections();
    data.forEach((element: any, index: any) => {
      const imgUrl = http.getURL() + element.src;
      const title = element.name;
      const desc = element.desc;
      const collection = new Collection(title, desc, imgUrl, index % 2 != 0);
      this.collections.push(collection);
    });
  }
}

class Collection {
  name: string = '';
  desc: string = '';
  img: string = '';
  floatRight: boolean = false;
  constructor(name: string, desc: string, img: string, floatRight: boolean) {
    this.name = name;
    this.desc = desc;
    this.img = img;
    this.floatRight = floatRight;
  }
}
