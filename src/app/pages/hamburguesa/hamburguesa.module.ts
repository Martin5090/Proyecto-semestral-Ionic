import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HamburguesaPageRoutingModule } from './hamburguesa-routing.module';

import { HamburguesaPage } from './hamburguesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HamburguesaPageRoutingModule
  ],
  declarations: [HamburguesaPage]
})
export class HamburguesaPageModule {}
