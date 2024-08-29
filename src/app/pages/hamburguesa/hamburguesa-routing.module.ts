import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HamburguesaPage } from './hamburguesa.page';

const routes: Routes = [
  {
    path: '',
    component: HamburguesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HamburguesaPageRoutingModule {}
