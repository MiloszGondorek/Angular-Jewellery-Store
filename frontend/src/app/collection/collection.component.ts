//collection.component.ts

import { Component, OnInit } from '@angular/core';
import { LinkComponent } from './link/link.component';
import axios, { AxiosResponse } from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [LinkComponent, CommonModule],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  collections: Array<Collection> = [];
  apiUrl = 'http://localhost:1337/api/collections?populate=*';

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    axios.get(this.apiUrl).then((response: AxiosResponse) => {
      const data = response.data;
      data.data.forEach((element: any, index: any) => {
        const imgUrl =
          'http://localhost:1337' +
          element.attributes.Image.data.attributes.url;
        const title = element.attributes.Title;
        const desc = element.attributes.Description;
        const collection = new Collection(title, desc, imgUrl, index % 2 != 0);
        this.collections.push(collection);
      });
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
