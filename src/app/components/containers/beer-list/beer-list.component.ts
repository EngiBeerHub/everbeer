import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatChipListbox,
  MatChipOption,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent implements OnInit {
  /** Chip */
  @ViewChild('chipList') chipList!: MatChipListbox;

  /** Beer list */
  allBeers?: Beer[]; // All beers
  displayedBeers?: Beer[]; // Displayed beers filtered
  isLoading?: boolean; // show spinner when true

  /** Paginator */
  @ViewChild('paginator') paginator!: MatPaginator;
  paginatorColor: ThemePalette = 'primary';
  paginatorLength = 0;
  paginatorSizeOptions = [30, 60];

  /** Map of filter options and functions */
  private readonly FILTER_MAP: Record<string, (beer: Beer) => boolean> = {
    'High Alcohol': (beer) => beer.abv > 8,
    Bitter: (beer) => beer.ibu > 50,
    Aroma: (beer) =>
      beer.ingredients.hops.some((hop) => hop.attribute === 'aroma'),
    'Pale Ale': (beer) => beer.description.toUpperCase().includes('PALE ALE'),
    IPA: (beer) =>
      beer.tagline.toUpperCase().includes('IPA') ||
      beer.description.toUpperCase().includes('IPA'),
    Black: (beer) =>
      beer.tagline.toUpperCase().includes('BLACK') ||
      beer.description.toUpperCase().includes('BLACK'),
    Imperial: (beer) =>
      beer.tagline.toUpperCase().includes('IMEPRIAL') ||
      beer.description.toUpperCase().includes('IMPERIAL'),
  };

  // Filter Options value on chip
  filterOptions = Object.keys(this.FILTER_MAP);

  /** vars for grid list */
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
        this.paginatorLength = fetchedBeers.length;
        this.allBeers = fetchedBeers;
        // this.displayedBeers = [...fetchedBeers];
        this.displayedBeers = this.allBeers.slice(
          0,
          this.paginatorSizeOptions[0],
        );
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

  /**
   * Filter beers by selected chips
   * @param selectedChips Array of selected chips
   */
  private filterBeers(selectedChips: MatChipOption[]) {
    // Always start from all beers
    this.displayedBeers = [...this.allBeers!];

    // Filter for all selected chips
    selectedChips.forEach((chip) => {
      const filterFunc = this.FILTER_MAP[chip.value];
      if (filterFunc) {
        this.displayedBeers = this.allBeers?.filter(filterFunc);
      }
    });
  }

  // TODO: handle change page
  onPaginatorChanged(event: PageEvent) {
    console.log(`event.length: ${event.length}`);
    console.log(`event.pageIndex: ${event.pageIndex}`);
    console.log(`event.pageSize: ${event.pageSize}`);
    console.log(`event.previousPageIndex: ${event.previousPageIndex}`);
  }
}
