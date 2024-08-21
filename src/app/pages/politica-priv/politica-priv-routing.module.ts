import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticaPrivPage } from './politica-priv.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticaPrivPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticaPrivPageRoutingModule {}
