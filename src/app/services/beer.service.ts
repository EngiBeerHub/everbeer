import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, retry, tap, timeout } from 'rxjs';
import { Beer } from '../models/beer';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BeerService {
  readonly beersUrl = 'https://api.punkapi.com/v2/beers/';
  readonly randomBeerUrl = `${this.beersUrl}random`;

  constructor(private httpClient: HttpClient) {}

  /**
   * GET a random beer from API
   * @returns a random beer
   */
  getRandomBeer(): Observable<Beer> {
    return this.httpClient.get<Beer[]>(this.randomBeerUrl).pipe(
      timeout(5000),
      retry(2),
      // need to convert array to single object.
      map((beers) => {
        if (beers.length === 0) {
          throw new Error('random beer array length is 0.');
        }
        return beers[0];
      }),
      tap((beer) => console.log(`random beer fetched: ${beer.name}`)),
      catchError(this.handleError),
    );
  }

  /**
   * Handle error both from client and backend.
   * @param error
   * @returns an error Observable
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('An error occurred. Please try again later.'),
    );
  }
}
