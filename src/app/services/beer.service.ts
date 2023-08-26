import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { Beer } from '../models/beer';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  readonly beersUrl = 'https://api.punkapi.com/v2/beers/';
  readonly randomBeerUrl = `${this.beersUrl}random`;

  constructor(private httpClient: HttpClient) {}

  /**
   * GET a random beer from API
   * @returns Observable<Beer>
   */
  getRandomBeer(): Observable<Beer> {
    return this.httpClient.get<Beer[]>(this.randomBeerUrl).pipe(
      // need to convert array to single object.
      map((beers) => {
        if (beers.length === 0) {
          throw new Error('random beer array length is 0.');
        }
        return beers[0];
      }),
      tap((beer) => console.log(`random beer fetched: ${beer.name}`)),
      catchError((error) => {
        console.error('Error while fetching random beer:', error);
        throw new Error(error);
      }),
    );
  }
}
