import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  beer?: Beer;
  isLoading?: boolean;
  imageUrl?: string;
  readonly altImageUrl = 'https://images.punkapi.com/v2/keg.png';

  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    // start loading to show spinner
    this.isLoading = true;

    this.beerService.getRandomBeer().subscribe((fetchedBeer) => {
      this.beer = fetchedBeer;
      // set alternative keg image when image url is null.
      this.beer.image_url
        ? (this.imageUrl = this.beer.image_url)
        : (this.imageUrl = this.altImageUrl);

      // stop loading to hide spinner
      this.isLoading = false;
    });
  }

  toJson(data: any): string {
    return JSON.stringify(data);
  }
}
