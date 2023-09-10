import { Component, OnInit } from '@angular/core';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent implements OnInit {
  beers?: Beer[];
  // vars for grid list
  gridCols = 3;
  gridGutterSize = '24px';
  gridRowHeight = 550;

  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.beerService.getAllBeers().subscribe({
      next: (fetchedBeers) => {
        this.beers = fetchedBeers;
      },
      complete: () => console.log('getAllBeers completed.'),
    });
  }
}
