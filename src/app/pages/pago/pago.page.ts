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
    this.storage.getItem('usuario').then((usuario: any) => {
      if (usuario) {
        const iduser = usuario.iduser;
        const carritoKey = `productos_carrito_${iduser}`;
  
        // Obtener productos del carrito
        this.storage.getItem(carritoKey)
          .then((productos) => {
            this.productosCarrito = productos || [];
          })
          .catch((error) => console.error('Error al obtener productos del carrito:', error));
  
        // Obtener el precio total
        this.storage.getItem('precio_total_carrito')
          .then((precioTotal) => {
            this.precioTotal = precioTotal || 0;
          })
          .catch((error) => console.error('Error al obtener precio total del carrito:', error));
  
        // Obtener el subtotal
        this.storage.getItem('subtotal_carrito')
          .then((subtotal) => {
            this.subtotal = subtotal || 0;
          })
          .catch((error) => console.error('Error al obtener subtotal del carrito:', error));
      } else {
        console.error('No se encontró el usuario logueado');
        this.presentAlert('Error', 'No se encontró el usuario logueado.');
      }
    }).catch(error => {
      console.error('Error al obtener el usuario logueado:', error);
    });
  }
  
  Pagorealizado() {
    // Validación de campos (igual que antes)
  
    this.storage.getItem('usuario').then((usuario: any) => {
      if (usuario) {
        const iduser = usuario.iduser;
        const carritoKey = `productos_carrito_${iduser}`;
  
        this.bd.actualizarTotalVenta(this.precioTotal)
          .then(() => this.bd.obtenerUltimaVentaId())
          .then((ventaId) => {
            const promesasDetalles = this.productosCarrito.map(producto =>
              this.bd.insertarDetalleVenta(ventaId, producto.id, producto.cantidad, producto.precio)
                .then(() => this.bd.actualizarStockProducto(producto.id, producto.cantidad))
            );
  
            return Promise.all(promesasDetalles);
          })
          .then(() => this.limpiarCarrito(carritoKey))
          .then(() => {
            this.presentAlert('Gracias por la compra', 'Su pago ha sido procesado exitosamente.');
            this.router.navigate(['/inicio']);
          })
          .catch(error => {
            console.error('Error al procesar el pago:', error);
            this.presentAlert('Error', 'Hubo un problema al procesar su pago. Inténtelo de nuevo.');
          });
      } else {
        console.error('No se encontró el usuario logueado');
        this.presentAlert('Error', 'No se encontró el usuario logueado.');
      }
    }).catch(error => {
      console.error('Error al obtener el usuario logueado:', error);
    });
  }
  
  limpiarCarrito(carritoKey: string) {
    return this.storage.setItem(carritoKey, [])
      .then(() => {
        console.log('Carrito limpiado correctamente');
      })
      .catch(error => {
        console.error('Error al limpiar el carrito:', error);
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
