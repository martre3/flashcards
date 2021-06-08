import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-input-entry',
  templateUrl: './multi-input-entry.component.html',
  styleUrls: ['./multi-input-entry.component.scss'],
})
export class MultiInputEntryComponent {
  @Input() active: boolean;
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() showColors = false;
  @Input() clickToCheck = false;
  @Input() color: string;
  @Input() isChecked: boolean;
  @Input() showCheckbox = false;
  @Output() remove = new EventEmitter<MouseEvent>();
  @Output() check = new EventEmitter<{ detail: { checked: boolean } }>();

  getColor(): string {
    if (this.showColors) {
      return this.color ? this.color : 'medium';
    }

    return this.active ? 'primary' : 'medium';
  }
}
