import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnChange } from 'property-watch-decorator';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() @OnChange('setDefault') tabs: string[] = [];
  @Output() tabChanged = new EventEmitter<string>();

  active = '';

  setDefault(): void {
    // eslint-disable-next-line prefer-destructuring
    this.active = this.tabs[0];
  }

  setActive(tab: string): void {
    this.active = tab;
    this.tabChanged.emit(tab);
  }
}
