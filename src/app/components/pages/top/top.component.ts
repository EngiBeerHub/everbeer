import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  beer: Beer | undefined;
  imageUrl: string | undefined;
  readonly altImageUrl = 'https://images.punkapi.com/v2/keg.png';

  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.beerService.getRandomBeer().subscribe((fetchedBeer) => {
      this.beer = fetchedBeer;
      // set alternative keg image when image url is null.
      this.beer.image_url
        ? (this.imageUrl = this.beer.image_url)
        : (this.imageUrl = this.altImageUrl);
    });
  }

  toJson(data: any): string {
    return JSON.stringify(data);
  }
}
