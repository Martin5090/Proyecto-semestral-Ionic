import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuponesPageRoutingModule } from './cupones-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { CuponesPage } from './cupones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuponesPageRoutingModule
  ],
  declarations: [CuponesPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class CuponesPageModule {}
