import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './top-page.component.html',
  styleUrls: ['./top-page.component.scss'],
})
export class TopPageComponent {
  constructor(private router: Router) {}
  onClickTitle() {
    this.router.navigate(['']);
  }
}
