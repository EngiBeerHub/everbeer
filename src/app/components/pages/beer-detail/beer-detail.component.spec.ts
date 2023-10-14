import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerDetailComponent } from './beer-detail.component';

describe('DetailComponent', () => {
  let component: BeerDetailComponent;
  let fixture: ComponentFixture<BeerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeerDetailComponent],
    });
    fixture = TestBed.createComponent(BeerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
