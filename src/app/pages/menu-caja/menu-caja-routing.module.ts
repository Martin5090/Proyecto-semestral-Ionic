import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCajaPage } from './menu-caja.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCajaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCajaPageRoutingModule {}
