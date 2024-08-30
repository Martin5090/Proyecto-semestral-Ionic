import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCrudPage } from './menu-crud.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCrudPageRoutingModule {}
