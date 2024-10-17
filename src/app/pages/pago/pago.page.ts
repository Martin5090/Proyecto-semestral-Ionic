import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service'; // Importamos el servicio

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  nombreusuario: string = '';
  numerotarjeta: string = '';
  diaExpiracion: string = '';
  cvv: string = '';
  productosCarrito: any[] = [];
  precioTotal: number = 0;
  subtotal: number = 0;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService,  
    private storage: NativeStorage  
  ) { }

  ngOnInit() {
    this.storage.getItem('productos_carrito')
      .then((productos) => {
        this.productosCarrito = productos || [];
      })
      .catch((error) => console.error('Error al obtener productos del carrito:', error));

    this.storage.getItem('precio_total_carrito')
      .then((precioTotal) => {
        this.precioTotal = precioTotal || 0;
      })
      .catch((error) => console.error('Error al obtener precio total del carrito:', error));

    this.storage.getItem('subtotal_carrito')
      .then((subtotal) => {
        this.subtotal = subtotal || 0;
      })
      .catch((error) => console.error('Error al obtener subtotal del carrito:', error));
  }

  Pagorealizado() {
  
  
  if (!this.nombreusuario || !this.numerotarjeta || !this.diaExpiracion || !this.cvv) {
    this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
    return;
  }

  const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
  if (!nombreRegex.test(this.nombreusuario)) {
    this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
    return;
  }

  if (this.numerotarjeta.length !== 16 || isNaN(Number(this.numerotarjeta))) {
    this.presentAlert('Número inválido', 'El número de la tarjeta debe ser válido y tener 16 dígitos.');
    return;
  }

  const [mesExpiracion, añoExpiracion] = this.diaExpiracion.split('/');
  const mesNumero = parseInt(mesExpiracion, 10);
  const añoNumero = parseInt(añoExpiracion, 10);

  if (isNaN(mesNumero) || isNaN(añoNumero) || mesNumero < 1 || mesNumero > 12 || añoExpiracion.length !== 2) {
    this.presentAlert('Fecha inválida', 'La fecha de expiración debe estar en formato MM/AA y ser válida.');
    return;
  }

  if (this.cvv.length !== 3 || isNaN(Number(this.cvv))) {
    this.presentAlert('CVV inválido', 'El CVV debe ser un número de exactamente 3 dígitos.');
    return;
  }

  
  this.bd.actualizarTotalVenta(this.precioTotal) 
    .then(() => {
   
      return this.bd.obtenerUltimaVentaId();  
    })
    .then((ventaId) => {
     
      const promesasDetalles = this.productosCarrito.map(producto => {
        
        return this.bd.insertarDetalleVenta(ventaId, producto.id, producto.cantidad, producto.precio)
        .then(() => {
       
          return this.bd.actualizarStockProducto(producto.id, producto.cantidad);
        });
      });

      return Promise.all(promesasDetalles);  
    })
    .then(() => {
      return this.limpiarCarrito(); 
    })
    .then(() => {
    
      this.presentAlert('Gracias por la compra', 'Su pago ha sido procesado exitosamente.');
      this.router.navigate(['/inicio']);
    })
    .catch(error => {
     
      this.presentAlert('Error', 'Hubo un problema al procesar su pago. Inténtelo de nuevo.');
    });
}


limpiarCarrito() {
  return this.storage.setItem('productos_carrito', [])
    .then(() => {
      console.log('Carrito limpiado correctamente');
    })
    .catch(error => {
      console.error('Error al limpiar el carrito', error);
      throw error; 
    });
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
