import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  beer: Beer | undefined;

  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.beerService.getRandomBeer().subscribe((fetchedBeer) => {
      this.beer = fetchedBeer;
    });
  }

  toJson(data: any): string {
    return JSON.stringify(data);
  }
}
