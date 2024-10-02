import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  //producto_id: string = "";
  //nombre_producto: string = "";
  //descripcion_producto: string = "";
  //foto_producto: string = "";
  //precio_producto!: number;
  //stock_producto!: number;

  producto: any;

  constructor(private router: Router,private alertController: AlertController,private bd: ServicebdService, private activedrouter: ActivatedRoute) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.producto = this.router.getCurrentNavigation()?.extras?.state?.['producto'];
      }
    })

  }

  ngOnInit() {
  }

  //sirve para hacer que aprezca el boton de archivo de imagen en el imput


  Editar() {
    if (!this.producto.nombre_producto || !this.producto.descripcion_producto || !this.producto.foto_producto || !this.producto.precio_producto || !this.producto.stock_producto ) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.producto.nombre_producto)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }
    const numeroStr = this.producto.precio_producto.toString();
    if (isNaN(Number(this.producto.precio_producto)) || numeroStr.length > 5) {
      this.presentAlert('Número inválido', 'Debe ingresar un precio apropiado y menor a los 5 digitos o igual .');
      return;
    };


    this.bd.modificarProducto(this.producto.producto_id, this.producto.nombre_producto, this.producto.descripcion_producto, this.producto.foto_producto,
      this.producto.precio_producto, this.producto.stock_producto
    );
    this.router.navigate(['/menu-crud']);

  };


  //PresentAlert
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


}
