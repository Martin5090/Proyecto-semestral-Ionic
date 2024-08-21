import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuDeliPageRoutingModule } from './menu-deli-routing.module';

import { MenuDeliPage } from './menu-deli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuDeliPageRoutingModule
  ],
  declarations: [MenuDeliPage]
})
export class MenuDeliPageModule {}
