import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerCardComponent } from './beer-card.component';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MatCardModule } from '@angular/material/card';

describe('BeerCardComponent', () => {
  let component: BeerCardComponent;
  let fixture: ComponentFixture<BeerCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeerCardComponent],
      imports: [MatCardModule],
    });
    fixture = TestBed.createComponent(BeerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
