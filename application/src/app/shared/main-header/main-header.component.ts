import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent {
  @Input() back = false;
  @Input() ellipsis = false;
  @Input() add: string;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
