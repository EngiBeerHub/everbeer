import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatChipListbox,
  MatChipOption,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent implements OnInit {
  @ViewChild('chipList') chipList!: MatChipListbox;
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

  /**
   * Handle selection and deselection of chips
   * @param event MatChipSelectionChange
   */
  onChipSelectionChange(event: MatChipSelectionChange) {
    // Logging
    console.log(event.selected);
    console.log(event.source.id);
    console.log(event.source.value);

    // integrate type of selected chips
    let selectedChips: MatChipOption[] = [];
    if (Array.isArray(this.chipList.selected)) {
      selectedChips = this.chipList.selected;
    } else {
      selectedChips.push(this.chipList.selected);
    }

    // Filter beers by selected chips
    this.filterBeers(selectedChips);
  }

  private filterHighAlcohol(beers: Beer[]): Beer[] {
    return beers.filter((beer) => {
      return beer.abv > 8;
    });
  }

  /**
   * Filter beers by selected chips
   * @param selectedChips Array of selected chips
   */
  private filterBeers(selectedChips: MatChipOption[]) {
    // Always start from all beers
    this.displayedBeers = [...this.allBeers!];

    // Filter for all selected chips
    selectedChips.forEach((chip) => {
      switch (chip.value) {
        case this.filterOptions[0]: // High Alcohol
          this.displayedBeers = this.displayedBeers?.filter(
            (beer) => beer.abv > 8,
          );
          break;
        case this.filterOptions[1]: // Bitter
          this.displayedBeers = this.displayedBeers?.filter(
            (beer) => beer.ibu > 50,
          );
          break;
        case this.filterOptions[2]: // Aroma
          this.displayedBeers = this.displayedBeers?.filter((beer) =>
            beer.ingredients.hops.some((hop) => hop.attribute === 'aroma'),
          );
          break;
        case this.filterOptions[3]: // Pale Ale
          this.displayedBeers = this.displayedBeers?.filter((beer) =>
            beer.description.toUpperCase().includes('PALE ALE'),
          );
          break;
        case this.filterOptions[4]: // IPA
          this.displayedBeers = this.displayedBeers?.filter(
            (beer) =>
              beer.tagline.toUpperCase().includes('IPA') ||
              beer.description.toUpperCase().includes('IPA'),
          );
          break;
        case this.filterOptions[5]: // Black
          this.displayedBeers = this.displayedBeers?.filter(
            (beer) =>
              beer.tagline.toUpperCase().includes('BLACK') ||
              beer.description.toUpperCase().includes('BLACK'),
          );
          break;
        case this.filterOptions[6]: // Imperial
          this.displayedBeers = this.displayedBeers?.filter(
            (beer) =>
              beer.tagline.toUpperCase().includes('IMEPRIAL') ||
              beer.description.toUpperCase().includes('IMPERIAL'),
          );
          break;
        default:
          break;
      }
    });
  }
}
