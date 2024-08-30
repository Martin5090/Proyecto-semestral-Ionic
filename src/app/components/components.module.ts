import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Componente1Component } from './componente1/componente1.component';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
  ],
  declarations: [Componente1Component],  
  exports: [Componente1Component]  

})
export class ComponentsModule {
}


