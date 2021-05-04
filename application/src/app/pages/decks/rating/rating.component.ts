import { Component, Input } from '@angular/core';
import { OnChange } from 'property-watch-decorator';

interface Star {
  value: number;
}

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent {
  @Input() @OnChange('generateStars') rating = 0;
  @Input() showInfo = true;

  totalStars = 5;
  stars: Star[] = [];
  iconMap = {
    0: 'star-outline',
    '0.5': 'star-half-outline',
    1: 'star',
  };

  generateStars(): void {
    this.stars = Array(this.totalStars)
      .fill(0)
      .map((_, i) => ({
        // eslint-disable-next-line no-nested-ternary
        value: this.rating - 1 >= i ? 1 : i - 1 < this.rating - 1 ? 0.5 : 0,
      }));
  }
}
