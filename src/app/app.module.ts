import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopPageComponent } from './components/pages/top/top-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BeerCardComponent } from './components/presentationals/beer-card/beer-card.component';
import { RandomBeerComponent } from './components/containers/random-beer/random-beer.component';
import { BeerListComponent } from './components/containers/beer-list/beer-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopPageComponent,
    BeerCardComponent,
    RandomBeerComponent,
    BeerListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
