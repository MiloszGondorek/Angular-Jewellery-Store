import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  transform=100;

  @ViewChild('header', { static: false })
  header!: ElementRef;

  changeHeader(){
    if(ElementRef!=null){
      if(this.transform==100){
        this.transform=0;
      }else{
        this.transform=100;
      }
      this.header.nativeElement.style.transform = `translate(${this.transform}%,0)`
    }
  }
}
