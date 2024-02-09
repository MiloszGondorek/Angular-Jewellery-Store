import {
  OnInit,
  Component,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
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
  price = 0;
  mainSrc = '';

  src = [
    '../../assets/images/items/item 1.png',
    '../../assets/images/about 1.png',
    '.../../assets/images/about 2.png',
    '../../assets/images/about 3.png',
    '../../assets/images/Main.png',
    '../../assets/images/present 1.png',
  ];

  @ViewChildren('child') childs!: QueryList<ElementRef>;

  currentX = 0;
  elementsInRow = 3;
  orientationHorizontal = false;

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
    const request = `items/${this.id}`;
    const d: any = await http.getData(request);
    if (Object.keys(d).length > 0) {
      this.price = d.attributes.Price;
      this.name = d.attributes.Name;
      const des: string = d.attributes.Description;
      if (des !== null) {
        this.description = des.split('\n');
      }
      const det: string = d.attributes.Details;
      if (det !== null) {
        this.details = det.split('\n');
      }
      this.mainSrc = this.src[0];
    } else {
      this.router.navigateByUrl('/404');
    }
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
