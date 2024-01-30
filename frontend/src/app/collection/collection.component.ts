import { Component } from '@angular/core';
import { LinkComponent } from './link/link.component';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent {}
