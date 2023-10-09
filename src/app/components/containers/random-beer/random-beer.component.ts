import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-random-beer',
  templateUrl: './random-beer.component.html',
  styleUrls: ['./random-beer.component.scss'],
})
export class RandomBeerComponent implements OnInit {
  beer?: Beer;
  error?: string;
  isLoading?: boolean;
  imageUrl?: string;
  readonly altImageUrl = 'https://images.punkapi.com/v2/keg.png';

  constructor(
    private beerService: BeerService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // start loading to show spinner
    this.isLoading = true;

    this.beerService.getRandomBeer().subscribe({
      next: (fetchedBeer) => {
        this.beer = fetchedBeer;
        // set alternative keg image when image url is null.
        this.beer.image_url
          ? (this.imageUrl = this.beer.image_url)
          : (this.imageUrl = this.altImageUrl);
        // stop loading to hide spinner
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
      complete: () => console.log('getRandomBeer completed.'),
    });
  }

  /**
   * Handle clicking card
   * @param beer shown beer
   */
  onClickCard(beer: Beer) {
    this.router.navigate(['/detail'], { state: { beer: beer } });
  }
}
