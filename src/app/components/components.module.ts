import { NgModule } from '@angular/core';
import { Componente1Component } from './componente1/componente1.component';  // Importar el componente

@NgModule({
  declarations: [Componente1Component],  
  exports: [Componente1Component]  

})
export class ComponentsModule {

    constructor() { }
  
    ngOnInit() {}
  
}


