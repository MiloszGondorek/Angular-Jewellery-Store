import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { Item, ItemComponent } from '../reusable/item/item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [FilterComponent, ItemComponent, CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent implements OnInit {
  data = ['rings', 'bracelets', 'earrings', 'necklaces'];
  header = '';
  description =
    'Nasza kolekcja pierścionków oferuje niepowtarzalne wzory, starannie wykonane z myślą o podkreśleniu piękna i indywidualności. Znajdziesz tu zarówno klasyczne diamentowe kompozycje, jak i unikalne kamienie szlachetne, tworzące niezapomniane akcenty, które doskonale wpiszą się w każdą chwilę. ';
  src = '../../assets/images/rings-bg.png';
  items: Item[] = [];
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const category = this.route.snapshot.params['category'];
    if (!this.data.includes(category)) {
      this.router.navigateByUrl('/home');
    }
    this.header = category;
    for (var i = 1; i <= 50; i++) {
      const newItem = new Item(i);
      this.items.push(newItem);
    }
  }
}
