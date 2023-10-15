import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatChipListbox,
  MatChipOption,
  MatChipSelectionChange,
} from '@angular/material/chips';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Beer } from 'src/app/models/beer';
import { BeerService } from 'src/app/services/beer.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent implements OnInit {
  /** Search bar */
  inputValue?: string;

  /** Chip */
  @ViewChild('chipList') chipList!: MatChipListbox;

  /** Beer list */
  allBeers?: Beer[]; // All beers from API
  filteredBeers?: Beer[]; // Beers filtered by chip
  displayedBeers?: Beer[]; // Beers displayed filtered and paged
  isLoading?: boolean; // show spinner when true
  altImageUrl = 'https://images.punkapi.com/v2/keg.png';

  /** Paginator */
  @ViewChild('paginator') paginator!: MatPaginator;
  paginatorColor: ThemePalette = 'primary';
  paginatorLength = 0;
  paginatorSizeOptions = [30, 60];
  currentPageSize = this.paginatorSizeOptions[0];
  isSp = false;

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
    private router: Router,
  ) {}

  ngOnInit(): void {
    // start loading to show spinner
    this.isLoading = true;

    // Fetch all beers from API
    this.beerService.getAllBeers().subscribe({
      next: (fetchedBeers) => {
        this.allBeers = fetchedBeers;
        this.filteredBeers = [...this.allBeers];
        this.resetPagination();
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
        this.isSp = false;
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
          this.isSp = true;
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

    // reset input value
    this.inputValue = '';

    // integrate type of selected chips
    let selectedChips: MatChipOption[] = [];
    if (Array.isArray(this.chipList.selected)) {
      selectedChips = this.chipList.selected;
    } else {
      selectedChips.push(this.chipList.selected);
    }

    // Filter beers by selected chips
    this.filterBeers(selectedChips);

    // Reset pagination with filtered beers
    this.resetPagination();
  }

  /**
   * Filter beers by selected chips
   * @param selectedChips Array of selected chips
   */
  private filterBeers(selectedChips: MatChipOption[]) {
    // Always start from all beers
    this.filteredBeers = [...this.allBeers!];

    // Filter for all selected chips
    selectedChips.forEach((chip) => {
      const filterFunc = this.FILTER_MAP[chip.value];
      if (filterFunc) {
        this.filteredBeers = this.filteredBeers?.filter(filterFunc);
      }
    });
  }

  /**
   * Handle changing page
   * @param event PageEvent
   */
  onPaginatorChanged(event: PageEvent) {
    // Logging
    console.log(`event.length: ${event.length}`);
    console.log(`event.pageIndex: ${event.pageIndex}`);
    console.log(`event.pageSize: ${event.pageSize}`);
    console.log(`event.previousPageIndex: ${event.previousPageIndex}`);

    // Handle change
    this.currentPageSize = event.pageSize;
    const start = this.currentPageSize * event.pageIndex;
    this.displayedBeers = this.filteredBeers?.slice(
      start,
      start + this.currentPageSize,
    );
  }

  /**
   * Reset pagination with filtered beers
   */
  private resetPagination() {
    this.paginatorLength = this.filteredBeers!.length;
    this.paginator.firstPage();
    this.displayedBeers = this.filteredBeers?.slice(0, this.currentPageSize);
  }

  /**
   * Handle click for search button
   */
  onClickSearch() {
    // reset chips
    (this.chipList.selected as MatChipOption[]).forEach(
      (chip) => (chip.selected = false),
    );

    // Always start from all beers
    this.filteredBeers = [...this.allBeers!];

    // filter beers from input
    if (this.inputValue) {
      this.filteredBeers = this.filteredBeers.filter(
        (beer) =>
          beer.name.toUpperCase().includes(this.inputValue!.toUpperCase()) ||
          beer.tagline.toUpperCase().includes(this.inputValue!.toUpperCase()) ||
          beer.description
            .toUpperCase()
            .includes(this.inputValue!.toUpperCase()),
      );
    }
    this.displayedBeers = this.filteredBeers;

    // coordinate pagination accordingly
    this.resetPagination();
  }

  /**
   * Handle clicking card
   * @param beer shown beer
   */
  onClickCard(beer: Beer) {
    this.router.navigate(['/detail'], { state: { beer: beer } });
  }
}
