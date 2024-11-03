import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialcPageRoutingModule } from './historialc-routing.module';

import { HistorialcPage } from './historialc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialcPageRoutingModule
  ],
  declarations: [HistorialcPage]
})
export class HistorialcPageModule {}
