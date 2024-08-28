import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerpedidoPage } from './verpedido.page';

const routes: Routes = [
  {
    path: '',
    component: VerpedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerpedidoPageRoutingModule {}
