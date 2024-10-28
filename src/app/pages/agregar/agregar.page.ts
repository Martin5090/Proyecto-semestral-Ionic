import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  categorias: Categoria[] = [];
  producto_id: string = "";
  nombre_producto: string = "";
  descripcion_producto: string = "";
  foto_producto: string = "";
  precio_producto!: number;
  stock_producto!: number;
  categoria_id!: number;

  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService) { }

  ngOnInit() {

    this.bd.MostrarCategoria().then(() => {
      this.bd.fetchCategoria().subscribe(datos => {
        this.categorias = datos;
      });
    });
  }




  Agregar() {
    if (!this.nombre_producto || !this.descripcion_producto || !this.foto_producto || !this.precio_producto || !this.stock_producto || !this.categoria_id) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombre_producto)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }

    const numeroStr = this.precio_producto.toString();
    if (isNaN(Number(this.precio_producto))||
    this.precio_producto <= 0 ||   
    numeroStr.length > 5) {
      this.presentAlert('Número inválido', 'Debe ingresar un precio apropiado.');
      return;
    };

    const numeroStock = this.stock_producto.toString();

   
    if (isNaN(Number(this.stock_producto)) ||
      this.stock_producto <= 0 ||   
      numeroStock.length > 2) {     
      this.presentAlert('Número inválido', 'Debe ingresar un stock apropiado mayor a 0 y menor a 100.');
      return;
    }


    this.bd.insertarProducto(this.nombre_producto, this.descripcion_producto, this.foto_producto, this.precio_producto, this.stock_producto, this.categoria_id);
    this.router.navigate(['/menu-crud']);

  };

  onFileSelected(event: any) {
    const file = event.target.files[0];  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        
        this.foto_producto = e.target.result;  
      };
      reader.readAsDataURL(file);  
    }
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
 


}
