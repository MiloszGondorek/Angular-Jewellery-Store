import {
  OnInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import { SliderComponent } from '../reusable/slider/slider.component';
import { SelectComponent } from '../reusable/select/select.component';
import { CountComponent } from './count/count.component';
import { ButtonComponent } from '../reusable/button/button.component';
import { CommonModule } from '@angular/common';
import { ServerData, ServerItem, http } from '../../httpConnection';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Storage } from '../../storage';
import { Select } from '../reusable/select/select.component';
import { BasketItemData } from '../basket/basket.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SliderComponent,
    SelectComponent,
    CountComponent,
    ButtonComponent,
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
  selectedSizeId: number = 0;
  sizes: Select[] = [];
  price = 0;
  mainSrc = '';
  showArrows = false;
  isFav = Fav.checkFav();

  canClick = true;
  buttonVal = 'Add to basket';

  src: any = [];

  @ViewChildren('child') childs!: QueryList<ElementRef>;
  @ViewChild('appSelect') appSelect!: SelectComponent;

  addToFav() {
    Fav.addToFav();
    this.isFav = Fav.checkFav();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      Fav.setId(this.id);
    });
    this.getData();
  }

  setSizeId(id: number) {
    this.selectedSizeId = id;
  }

  addToBasket() {
    if (this.canClick) {
      Basket.addToBasket(this.selectedSizeId, this.id);
      this.setCanClick(false);
      this.buttonVal = 'Item added to basket';
    }
  }
  setCanClick(val: boolean) {
    this.canClick = val;
    this.buttonVal = 'Add to basket';
  }

  getData() {
    let data: ServerItem = ServerData.getItems().filter(
      (a) => a.id == this.id
    )[0];
    let catId = 1;
    if (data !== undefined) {
      catId = data.categoryId;
      this.price = data.price;
      this.name = data.name;
      const des: string = data.desc;
      const serverURL = http.getURL();
      this.src.push(serverURL + data.MainImage);

      if (des !== null) {
        this.description = des.split('\n');
      }

      const images = data.allImages;
      if (images !== undefined) {
        images.forEach((s) => {
          this.src.push(s);
        });
        ImagesList.setChildrens(this.childs);
      }

      this.mainSrc = this.src[0];
    } else {
      this.router.navigateByUrl('/404');
    }
    this.isFav = Fav.checkFav();

    const sizeData = ServerData.getCategories()[catId].sizes;
    if (sizeData !== undefined) {
      sizeData.forEach((size: any) => {
        const newSize = new Select(size);
        this.sizes.push(newSize);
      });
      if (sizeData.length > 2) {
        this.showArrows = true;
      }
    }
  }

  moveUp() {
    ImagesList.setChildrens(this.childs);
    ImagesList.moveUp();
  }

  moveDown() {
    ImagesList.setChildrens(this.childs);
    ImagesList.moveDown();
  }

  setImage(src: string) {
    this.mainSrc = src;
  }

  @HostListener('window:resize', ['$event'])
  checkOrientation() {
    ImagesList.setOrientation();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}

class ImagesList {
  static currentX = 0;
  static elementsInRow = 3;
  static orientationHorizontal = false;
  static src: any = [];
  static childs: QueryList<ElementRef>;

  public static addSrc(src: string) {
    this.src = src;
  }

  static setChildrens(newChilds: QueryList<ElementRef>) {
    this.childs = newChilds;
  }

  static moveDown() {
    this.currentX--;
    this.move();
  }

  static moveUp() {
    this.currentX++;
    this.move();
  }

  static move() {
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

  static checkPositions() {
    if (this.currentX == 1) {
      this.currentX = -this.childs.length + this.elementsInRow;
    }
    if (this.elementsInRow - this.currentX > this.childs.length) {
      this.currentX = 0;
    }
  }

  static setOrientation() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) {
        this.orientationHorizontal = false;
      } else {
        this.orientationHorizontal = true;
      }
    }
  }
}

class Fav {
  static id: number;

  static setId(id: number) {
    this.id = id;
  }

  static isInFav() {
    const jsonData = Storage.getData('fav');
    const data = JSON.parse(jsonData);
    return data.findIndex((i: any) => i == this.id) != -1;
  }

  static addToFav() {
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

  static checkFav() {
    return this.isInFav();
  }
}

class Basket {
  static addToBasket(sizeId: number, itemId: number) {
    const jsonData = Storage.getData('basket');
    let items: BasketItemData[] = [];
    const data = JSON.parse(jsonData);
    data.forEach((itemData: any) => {
      const item = new BasketItemData(itemData.sizeId, itemData.id);
      items.push(item);
    });
    const item = new BasketItemData(sizeId, itemId);
    items.push(item);
    const json = JSON.stringify(items);
    Storage.setData('basket', json);
  }
}
