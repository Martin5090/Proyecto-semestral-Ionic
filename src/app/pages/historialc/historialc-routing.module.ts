import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialcPage } from './historialc.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialcPageRoutingModule {}
