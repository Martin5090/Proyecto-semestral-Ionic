import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCajaPageRoutingModule } from './menu-caja-routing.module';

import { MenuCajaPage } from './menu-caja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCajaPageRoutingModule
  ],
  declarations: [MenuCajaPage]
})
export class MenuCajaPageModule {}
