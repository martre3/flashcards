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
  @Input() color: string;
  @Output() remove = new EventEmitter<MouseEvent>();

  getColor(): string {
    if (this.readOnly) {
      return this.color ? this.color : 'medium';
    }

    return this.active ? 'primary' : 'medium';
  }
}
