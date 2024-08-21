import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticaPrivPageRoutingModule } from './politica-priv-routing.module';

import { PoliticaPrivPage } from './politica-priv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticaPrivPageRoutingModule
  ],
  declarations: [PoliticaPrivPage]
})
export class PoliticaPrivPageModule {}
