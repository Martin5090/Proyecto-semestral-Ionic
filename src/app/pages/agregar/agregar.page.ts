import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  producto_id: string = "";
  nombre_producto: string = "";
  descripcion_producto: string = "";
  foto_producto: string = "";
  precio_producto!: number;
  stock_producto!: number;
    
  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService) { }

  ngOnInit() {
  }

  //sirve para hacer que aprezca el boton de archivo de imagen en el imput


  Agregar() {
    if (!this.nombre_producto || !this.descripcion_producto || !this.foto_producto || !this.precio_producto || !this.stock_producto) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombre_producto)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }

    const numeroStr = this.precio_producto.toString();
    if (isNaN(Number(this.precio_producto)) || numeroStr.length > 5 ) {
      this.presentAlert('Número inválido', 'Debe ingresar un stock apropiado y menor a los 3 digitos o igual .');
      return;
    };

    const numeroStock = this.stock_producto.toString();
    if (isNaN(Number(this.stock_producto)) || numeroStock.length > 3 ) {
      this.presentAlert('Número inválido', 'Debe ingresar un precio apropiado y menor a los 5 digitos o igual .');
      return;
    };


    this.bd.insertarProducto(this.nombre_producto, this.descripcion_producto, this.foto_producto, this.precio_producto, this.stock_producto);
    this.router.navigate(['/menu-crud']);

  };

  onFileSelected(event: any) {
    const file = event.target.files[0];  // Obtén el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convertimos la imagen a base64 o URL para la vista previa
        this.foto_producto = e.target.result;  // Guardamos la URL en la variable
      };
      reader.readAsDataURL(file);  // Leemos el archivo como una URL o base64
    }
  }



  //PresentAlert
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //Alerta Toast
  

}
