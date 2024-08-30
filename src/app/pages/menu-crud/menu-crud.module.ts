import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCrudPageRoutingModule } from './menu-crud-routing.module';

import { MenuCrudPage } from './menu-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCrudPageRoutingModule
  ],
  declarations: [MenuCrudPage]
})
export class MenuCrudPageModule {}
