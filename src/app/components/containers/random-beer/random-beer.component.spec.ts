import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomBeerComponent } from './random-beer.component';
import { BeerService } from 'src/app/services/beer.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { mockRandomBeers } from 'src/app/testing/mock-beer';
import { of } from 'rxjs';
import { BeerCardComponent } from '../../presentationals/beer-card/beer-card.component';

describe('RandomBeerComponent', () => {
  let component: RandomBeerComponent;
  let fixture: ComponentFixture<RandomBeerComponent>;
  let beerService: jasmine.SpyObj<BeerService>;

  beforeEach(() => {
    beerService = jasmine.createSpyObj('BeerService', ['getRandomBeer']);
    beerService.getRandomBeer.and.returnValue(of(mockRandomBeers[0]));
    TestBed.configureTestingModule({
      declarations: [RandomBeerComponent, BeerCardComponent],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: BeerService, useValue: beerService }],
    });
    fixture = TestBed.createComponent(RandomBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch beer and set imageUrl if image_url exists', () => {
    beerService.getRandomBeer.and.returnValue(of(mockRandomBeers[0]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.beer).toEqual(mockRandomBeers[0]);
    expect(component.imageUrl).toEqual('https://images.punkapi.com/v2/37.png');
    expect(component.isLoading).toBeFalse();
  });

  it('should fetch beer and set altImageUrl if image_url is null or undefined', () => {
    const mockBeerWithoutImageUrl = {
      ...mockRandomBeers[0],
      image_url: null,
    };
    beerService.getRandomBeer.and.returnValue(of(mockBeerWithoutImageUrl));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.beer).toEqual(mockBeerWithoutImageUrl);
    expect(component.imageUrl).toEqual(component.altImageUrl);
    expect(component.isLoading).toBeFalse();
  });
});
