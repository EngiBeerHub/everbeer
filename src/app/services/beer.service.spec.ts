import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { BeerService } from './beer.service';
import { Beer } from '../models/beer';
import { mockRandomBeer } from '../testing/mock-beer';
import { catchError, lastValueFrom, of } from 'rxjs';

describe('BeerService', () => {
  let httpTestingController: HttpTestingController;
  let service: BeerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BeerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no request remained
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get random beer from server', () => {
    const expected: Beer[] = mockRandomBeer;

    // Assert response
    service.getRandomBeer().subscribe((actual) => {
      expect(actual).toEqual(expected[0]);
    });
    // Create test request
    const req = httpTestingController.expectOne(
      'https://api.punkapi.com/v2/beers/random',
    );
    // Assert method
    expect(req.request.method).toEqual('GET');

    req.flush(expected);
  });

  it('should throw an error when no beer found', async () => {
    service.getRandomBeer().subscribe({
      error: (err) =>
        expect(err.message).toEqual('Error: random beer array length is 0.'),
    });
    // Create test request
    const req = httpTestingController.expectOne(
      'https://api.punkapi.com/v2/beers/random',
    );
    // Assert method
    expect(req.request.method).toEqual('GET');

    req.flush([]);
  });
});
