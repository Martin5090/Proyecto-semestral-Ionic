import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerpedidoPageRoutingModule } from './verpedido-routing.module';

import { VerpedidoPage } from './verpedido.page';

import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerpedidoPageRoutingModule,
    ComponentsModule
    
  ],
  declarations: [VerpedidoPage]
})
export class VerpedidoPageModule {}
