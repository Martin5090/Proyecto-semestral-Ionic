import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Producto } from 'src/app/model/producto';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  Tiposdecomida: any = [];

  constructor(private router: Router, private bd: ServicebdService) { }

  ngOnInit() {
    
    this.bd.dbState().subscribe(data => {
      if (data) {
        
        this.bd.fetchProducto().subscribe(res => {
          this.Tiposdecomida = res; 
        });
        
       
        this.bd.seleccionarProducto();
      }
    });
  }


  modificar(comida:any){
    let navigationsExtras: NavigationExtras = {
      state: {
        producto: comida
      }
    }
    this.router.navigate(['/editar'], navigationsExtras);

  }

  
  eliminar(comida: any) {
    this.bd.marcarProductoSinStock(comida.producto_id).then(() => {
      this.bd.seleccionarProducto(); 
    }).catch(e => {
      console.error("Error al marcar como sin stock:", e);
    });
  }
}


