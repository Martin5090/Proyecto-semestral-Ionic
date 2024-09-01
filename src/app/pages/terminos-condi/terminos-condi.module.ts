import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminosCondiPageRoutingModule } from './terminos-condi-routing.module';

import { TerminosCondiPage } from './terminos-condi.page';

import { ComponentsModule } from '../../components/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    TerminosCondiPageRoutingModule
  ],
  declarations: [TerminosCondiPage]
})
export class TerminosCondiPageModule {}
