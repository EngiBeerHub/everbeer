import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardComponent {}
