import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  @Input() options = [];
  //options = ['Opcja 1', 'Opcja 2', 'Opcja 3'];
  @Input() header = 'Sortuj';
  currentOption: string = '';
  showOptions = false;
  ngOnInit(): void {
    if (this.options.length > 0) this.currentOption = this.options[0];
  }
  changeOptionVisability() {
    this.showOptions = !this.showOptions;
  }
  changeOption(newOption: string) {
    this.currentOption = newOption;
  }
}
