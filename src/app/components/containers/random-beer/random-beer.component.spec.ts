import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBeerComponent } from './random-beer.component';
import { BeerService } from 'src/app/services/beer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('RandomBeerComponent', () => {
  let component: RandomBeerComponent;
  let fixture: ComponentFixture<RandomBeerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomBeerComponent],
      imports: [MatProgressSpinnerModule, HttpClientTestingModule],
      providers: [BeerService],
    });
    fixture = TestBed.createComponent(RandomBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start loading', () => {
    expect(component.isLoading).toEqual(true);
  });
});
