import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
  isLoading?: boolean;
  // vars for grid list
  gridCols = 3;
  gridGutterSize = '8px'; // plus 8px margin of each cards
  gridRowHeight = 472;

  constructor(
    private beerService: BeerService,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    // start loading to show spinner
    this.isLoading = true;

    // Fetch all beers from API
    this.beerService.getAllBeers().subscribe({
      next: (fetchedBeers) => {
        this.beers = fetchedBeers;
        this.isLoading = false;
      },
      // TODO: error:
      complete: () => console.log('getAllBeers completed.'),
    });

    // Observe some predefined breakpoints and set the grid accordingly.
    this.breakpointObserver
      .observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;
        // TODO: configure more detail
        if (breakpoints[Breakpoints.TabletPortrait]) {
          this.gridCols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.gridCols = 1;
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.gridCols = 1;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.gridCols = 2;
        }
      });
  }
}
