import { Component } from '@angular/core';

import { PresentLinkComponent } from './present-link/present-link.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-present-container',
  standalone: true,
  imports: [PresentLinkComponent,CommonModule],
  templateUrl: './present-container.component.html',
  styleUrl: './present-container.component.scss'
})
export class PresentContainerComponent {

}
