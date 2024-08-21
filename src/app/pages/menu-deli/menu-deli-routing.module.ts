import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuDeliPage } from './menu-deli.page';

const routes: Routes = [
  {
    path: '',
    component: MenuDeliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuDeliPageRoutingModule {}
