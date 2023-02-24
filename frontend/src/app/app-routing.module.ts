import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortofolioComponent } from './components/portofolio/portofolio.component';

const routes: Routes = [
  { path: '', component: PortofolioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
