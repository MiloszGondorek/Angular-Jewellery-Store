import {
  OnInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { SliderComponent } from '../reusable/slider/slider.component';
import { LinkComponent } from './link/link.component';
import { SelectComponent } from '../reusable/select/select.component';
import { CountComponent } from './count/count.component';
import { ButtonComponent } from '../reusable/button/button.component';
import { StarComponent } from './star/star.component';
import { CommonModule } from '@angular/common';
import { http } from '../../httpConnection';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '../../storage';
import { Item } from '../reusable/item/item.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SliderComponent,
    LinkComponent,
    SelectComponent,
    CountComponent,
    ButtonComponent,
    StarComponent,
    CommonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  id = 1;
  name = '';
  description: any = [];
  details: any = [];
  sizes: any = [];
  price = 0;
  mainSrc = '';
  showArrows = false;
  isFav = false;

  src: any = [];

  @ViewChildren('child') childs!: QueryList<ElementRef>;

  @ViewChild('appSelect') appSelect!: SelectComponent;

  currentX = 0;
  elementsInRow = 3;
  orientationHorizontal = false;
  isInFav() {
    const jsonData = Storage.getData('fav');
    const data = JSON.parse(jsonData);
    return data.findIndex((i: any) => i == this.id) != -1;
  }
  addToFav() {
    const jsonData = Storage.getData('fav');
    let items: number[] = [];
    const data = JSON.parse(jsonData);
    data.forEach((id: any) => {
      items.push(id);
    });
    let searchId = items.findIndex((i) => i == this.id);
    if (searchId == undefined) searchId = -1;
    if (searchId > -1) {
      items.splice(searchId, 1);
    } else {
      items.push(this.id);
    }
    const json = JSON.stringify(items);
    Storage.setData('fav', json);
    this.checkFav();
  }

  checkFav() {
    this.isFav = this.isInFav();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) {
        this.orientationHorizontal = false;
      } else {
        this.orientationHorizontal = true;
      }
    }
    this.getData();
  }
  async getData() {
    const request = `items/${this.id}?populate=*`;
    const data: any = await http.getData(request);
    if (Object.keys(data).length > 0) {
      this.price = data.attributes.Price;
      this.name = data.attributes.Name;
      const des: string = data.attributes.Description;
      const serverURL = http.getURL();
      this.src.push(serverURL + data.attributes.MainImage.data.attributes.url);

      const images = data.attributes.Images.data;
      if (images !== null) {
        for (let url of images) {
          this.src.push(serverURL + url.attributes.url);
          if (this.src.length > 3) {
            this.showArrows = true;
          }
        }
      }
      if (des !== null) {
        this.description = des.split('\n');
      }
      const det: string = data.attributes.Details;
      if (det !== null) {
        this.details = det.split('\n');
      }
      this.mainSrc = this.src[0];

      const sizes: any = data.attributes.Size;
      sizes.forEach((size: any) => {
        this.sizes.push(size.Size);
      });
    } else {
      this.router.navigateByUrl('/404');
    }
    this.checkFav();
  }

  moveDown() {
    this.currentX--;
    this.move();
  }

  moveUp() {
    this.currentX++;
    this.move();
  }

  checkPositions() {
    if (this.currentX == 1) {
      this.currentX = -this.src.length + this.elementsInRow;
    }
    if (this.elementsInRow - this.currentX > this.src.length) {
      this.currentX = 0;
    }
  }

  move() {
    this.checkPositions();
    this.childs.forEach((child) => {
      const element = child.nativeElement as HTMLElement;
      if (this.orientationHorizontal) {
        element.style.transform = `translate(calc((100% + 1.25rem) * ${this.currentX} ),0)`;
      } else {
        element.style.transform = `translate(0,calc((100% + 1.25rem) * ${this.currentX} ))`;
      }
    });
  }

  setImage(src: string) {
    this.mainSrc = src;
  }

  @HostListener('window:resize', ['$event'])
  checkOrientation() {
    if (window.innerWidth >= 1280) {
      this.orientationHorizontal = false;
    } else {
      this.orientationHorizontal = true;
    }
    this.checkPositions();
    this.move();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
