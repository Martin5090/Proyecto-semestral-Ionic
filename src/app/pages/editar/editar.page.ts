import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Categoria } from 'src/app/model/categoria';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  categorias: Categoria[] = [];
  foto_producto: string = "";

  producto: any;

  constructor(private router: Router, private alertController: AlertController, private bd: ServicebdService, private activedrouter: ActivatedRoute) {
    this.activedrouter.queryParams.subscribe(res => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.producto = this.router.getCurrentNavigation()?.extras?.state?.['producto'];
      }
    })

  }

  ngOnInit() {
    this.bd.MostrarCategoria().then(() => {
      this.bd.fetchCategoria().subscribe(datos => {
        this.categorias = datos;
      });
    });
  }




  Editar() {
    // Aplicar trim para eliminar espacios al principio y al final de los campos de texto
    this.producto.nombre_producto = this.producto.nombre_producto.trim();
    this.producto.descripcion_producto = this.producto.descripcion_producto.trim();
  
    if (!this.producto.nombre_producto || !this.producto.descripcion_producto ||
      !this.producto.foto_producto || !this.producto.precio_producto ||
      !this.producto.stock_producto || !this.producto.categoria_id) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
  
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.producto.nombre_producto)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }
  
    const precioRegex = /^[1-9]\d{0,4}$/;
    if (!precioRegex.test(this.producto.precio_producto.toString())) {
      this.presentAlert('Precio inválido', 'El precio debe ser un número positivo y no debe exceder 5 dígitos.');
      return;
    }
  
    const stockRegex = /^[1-9]\d*$/;
    if (!stockRegex.test(this.producto.stock_producto.toString())) {
      this.presentAlert('Stock inválido', 'El stock debe ser un número entero positivo.');
      return;
    }
  
    this.bd.modificarProducto(this.producto.producto_id, this.producto.nombre_producto, this.producto.descripcion_producto, this.producto.foto_producto,
      this.producto.precio_producto, this.producto.stock_producto, this.producto.categoria_id
    );
    this.router.navigate(['/menu-crud']);
  };
  


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {

        this.producto.foto_producto = e.target.result;
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
