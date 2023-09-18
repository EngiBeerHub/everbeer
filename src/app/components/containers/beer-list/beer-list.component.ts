import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent implements OnInit {
  allBeers?: Beer[]; // All beers
  displayedBeers?: Beer[]; // Displayed beers filtered
  isLoading?: boolean; // show spinner when true

  // Filter Options on chip
  filterOptions = [
    'High Alcohol',
    'Bitter',
    'Aroma',
    'Pale Ale',
    'IPA',
    'Black',
    'Imperial',
  ];

  // vars for grid list
  initialGridCols = 3;
  gridCols = this.initialGridCols;

  initialGridGutterSize = '8px';
  gridGutterSize = this.initialGridGutterSize; // plus 8px margin of each cards

  initialGridRowHeight = 472;
  gridRowHeight = this.initialGridRowHeight;

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
        this.allBeers = fetchedBeers;
        this.displayedBeers = [...fetchedBeers];
        this.isLoading = false;
      },
      // TODO: error:
      complete: () => console.log('getAllBeers completed.'),
    });

    // Observe some predefined breakpoints and set the grid accordingly.
    this.breakpointObserver
      .observe([
        Breakpoints.WebLandscape,
        Breakpoints.TabletLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
      ])
      .subscribe((result) => {
        const breakpoints = result.breakpoints;
        // TODO: configure more detail
        if (breakpoints[Breakpoints.WebLandscape]) {
          this.gridCols = 3;
        } else if (breakpoints[Breakpoints.TabletLandscape]) {
          this.gridCols = 2;
        } else if (breakpoints[Breakpoints.TabletPortrait]) {
          this.gridCols = 2;
        } else if (breakpoints[Breakpoints.HandsetLandscape]) {
          this.gridCols = 1;
        } else if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.gridCols = 1;
        }
      });
  }

  onChipSelectionChange(event: MatChipSelectionChange) {
    console.log(event.selected);
    console.log(event.source.id);
    console.log(event.source.value);
    if (event.selected) {
      // 選択された場合は、選択肢に対応するフィルタ関数をdisplayedBeerに適用する
      switch (event.source.value) {
        case this.filterOptions[0]: // 'High Alcohol'
          this.displayedBeers = this.filterHighAlcohol(this.displayedBeers!);
          break;
        default:
          break;
      }
    } else {
      // TODO: 選択が外された場合は、改めてallBeersに対して他に選択されているフィルタを全てかけ直す
    }
  }

  private filterHighAlcohol(beers: Beer[]): Beer[] {
    return beers.filter((beer) => {
      return beer.abv > 8;
    });
  }

  // TODO: more filter functions
}
