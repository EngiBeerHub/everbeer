import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, tap, timeout } from 'rxjs';
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
      catchError(this.handleError('getRandomBeer')),
    ) as Observable<Beer>;
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      const message =
        error.error instanceof ErrorEvent
          ? error.error.message
          : `backend returned code ${error.status}, body was ${error.error}`;
      throw new Error(`${operation} failed: ${message}`);
    };
    // // client or network error
    // if (error.status === 0) {
    //   console.error('An error occurred: ', error.message);
    //   // server error
    // } else {
    //   console.error(
    //     `Backend returned code ${error.status}, body was: `,
    //     error.message,
    //   );
    // }
    // throw new Error('Error while fetching random beer. Please retry later.');
  }
}
