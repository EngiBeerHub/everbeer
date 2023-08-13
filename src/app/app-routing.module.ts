import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopComponent } from './components/pages/top/top.component';

const routes: Routes = [
  { path: '', redirectTo: '/top', pathMatch: 'prefix' },
  { path: 'top', component: TopComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
