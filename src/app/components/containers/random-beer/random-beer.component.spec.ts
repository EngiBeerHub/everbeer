import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBeerComponent } from './random-beer.component';

describe('RandomBeerComponent', () => {
  let component: RandomBeerComponent;
  let fixture: ComponentFixture<RandomBeerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomBeerComponent],
    });
    fixture = TestBed.createComponent(RandomBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
