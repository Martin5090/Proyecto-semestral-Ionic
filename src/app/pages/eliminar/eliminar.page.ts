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

  Tiposdecomida: any = [
    {
      producto_id: '',
      nombre_producto: '',
      descripcion_producto: '',
      foto_producto: '',
      precio_producto: '',
      stock_producto: ''
    }


  ];

  constructor(private router: Router, private bd: ServicebdService) { }

  ngOnInit() {
    this.bd.dbState().subscribe(data=>{
      //validar si la bd esta lista
      if(data){
        //subscribir al observable de la listaNoticias
        this.bd.fetchProducto().subscribe(res=>{
          this.Tiposdecomida = res;
        })
      }
    })
  }

  modificar(comida:any){
    let navigationsExtras: NavigationExtras = {
      state: {
        producto: comida
      }
    }
    this.router.navigate(['/editar'], navigationsExtras);

  }

  eliminar(comida:any) {
    this.bd.eliminarProducto(comida.producto_id);


  }

}


