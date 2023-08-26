import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopPageComponent } from './components/pages/top/top-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'prefix' },
  { path: 'top', component: TopPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
