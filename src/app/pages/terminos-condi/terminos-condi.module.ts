import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminosCondiPageRoutingModule } from './terminos-condi-routing.module';

import { TerminosCondiPage } from './terminos-condi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminosCondiPageRoutingModule
  ],
  declarations: [TerminosCondiPage]
})
export class TerminosCondiPageModule {}
