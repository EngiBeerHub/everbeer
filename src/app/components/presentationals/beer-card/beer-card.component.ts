import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Beer } from 'src/app/models/beer';

@Component({
  selector: 'app-beer-card',
  templateUrl: './beer-card.component.html',
  styleUrls: ['./beer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeerCardComponent {
  @Input() beer?: Beer;
  @Input() imageUrl?: string;
  @Input() error?: string;
}
