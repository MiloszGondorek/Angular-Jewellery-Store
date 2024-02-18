import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent implements OnInit {
  @Input() options: Select[] = [];
  @Input() header = 'Sortuj';

  @Output() sendId = new EventEmitter();

  currentOption: string = '';
  currentId: number = 0;
  showOptions = false;

  ngOnInit(): void {
    if (this.options.length > 0) this.currentOption = this.options[0].getName();
  }

  changeOptionVisability() {
    this.showOptions = !this.showOptions;
  }

  changeOption(id: number) {
    const newOption = this.options.find((a) => a.getId() == id)?.getName();
    if (newOption !== undefined) {
      this.currentId = id;
      this.currentOption = newOption;
      this.sendId.emit(id);
    }
  }
}

export class Select {
  private name!: string;
  private id!: number;
  static selectsSize = 0;

  constructor(name: string) {
    this.name = name;
    this.id = Select.selectsSize;
    Select.selectsSize++;
  }

  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }
}
