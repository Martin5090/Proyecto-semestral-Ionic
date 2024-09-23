import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DirecciondeliPageRoutingModule } from './direcciondeli-routing.module';

import { DirecciondeliPage } from './direcciondeli.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DirecciondeliPageRoutingModule
  ],
  declarations: [DirecciondeliPage]
})
export class DirecciondeliPageModule {}
