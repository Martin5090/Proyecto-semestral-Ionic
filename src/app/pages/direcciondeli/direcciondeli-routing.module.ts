import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DirecciondeliPage } from './direcciondeli.page';

const routes: Routes = [
  {
    path: '',
    component: DirecciondeliPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirecciondeliPageRoutingModule {}
