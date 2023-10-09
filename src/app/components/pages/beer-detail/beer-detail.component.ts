import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beer } from 'src/app/models/beer';

@Component({
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.scss'],
})
export class BeerDetailComponent implements OnInit {
  beer?: Beer;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.beer = (history.state as BeerState).beer;
  }
}

/**
 * state passed from parent component
 */
export interface BeerState {
  beer: Beer;
}
