import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-menu-caja',
  templateUrl: './menu-caja.page.html',
  styleUrls: ['./menu-caja.page.scss'],
})
export class MenuCajaPage implements OnInit {
  Tiposdecomida: any = [{
    producto_id: '',
    nombre_producto: '',
    descripcion_producto: '',
    foto_producto: '',
    precio_producto: '',
    stock_producto: ''
  }

  ];

  constructor(private router: Router,
    private toastController: ToastController,
    private bd: ServicebdService) { }

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

  Carrito() {
    this.presentToast('bottom');


  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Tu selección fue agregada al carrito.',
      duration: 2500,
      position: position,
      color: 'success'

    });

    await toast.present();
  }
}
