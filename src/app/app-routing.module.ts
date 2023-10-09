import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopPageComponent } from './components/pages/top/top-page.component';
import { BeerDetailComponent } from './components/pages/beer-detail/beer-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'full' },
  { path: 'top', component: TopPageComponent },
  { path: 'detail', component: BeerDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
