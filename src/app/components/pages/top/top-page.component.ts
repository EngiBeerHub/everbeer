import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss'],
})
export class TopPageComponent implements OnInit {
  classMain = 'main-pc';

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    // Observe some predefined breakpoints and set the class of main.
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe((result) => {
        this.classMain = 'main-pc'; // default class is pc
        const breakpoints = result.breakpoints;
        if (breakpoints[Breakpoints.HandsetPortrait]) {
          this.classMain = 'main-sp';
        }
      });
  }

  /**
   * Handle click for title on toolbar
   */
  onClickTitle() {
    this.router.navigate(['']);
  }
}
