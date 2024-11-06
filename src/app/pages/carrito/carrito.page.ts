import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];
  precioTotal: number = 0;
  cupon: string = '';
  descuento: number = 0;
  subtotal: number = 0;

  constructor(private storage: NativeStorage,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.getItem('usuario')
      .then((usuario) => {
        if (usuario && usuario.iduser) {
          const iduser = usuario.iduser;
          const carritoKey = `productos_carrito_${iduser}`;

          // Obtener los productos del carrito asociados al usuario
          this.storage.getItem(carritoKey)
            .then((productos) => {
              if (productos && productos.length > 0) {
                this.productosCarrito = productos;
                this.calcularTotal();
              } else {
                console.log('Carrito vacío');
                this.productosCarrito = [];
                this.precioTotal = 0;
                this.subtotal = 0;
              }
            })
            .catch(() => {
              console.log('No se pudo obtener el carrito');
              this.productosCarrito = [];
              this.calcularTotal();
            });
        }
      })
      .catch(() => {
        console.log('No se pudo obtener el usuario logueado');
      });
  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.actualizarCarrito();
  }

  vaciarCarrito() {
    this.productosCarrito = [];
    this.precioTotal = 0;
    this.actualizarCarrito();
  }

  increaseQuantity(index: number) {
    const producto = this.productosCarrito[index];
    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.calcularTotal();
      this.actualizarCarrito();
    } else {
      console.log('No hay suficiente stock disponible');
    }
  }

  decreaseQuantity(index: number) {
    const producto = this.productosCarrito[index];
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotal();
      this.actualizarCarrito();
    } else {
      console.log('No puedes disminuir más la cantidad, debe ser al menos 1');
    }
  }

  // Función para actualizar el carrito en NativeStorage
  actualizarCarrito() {
    this.storage.getItem('usuario').then((usuario) => {
      if (usuario && usuario.iduser) {
        const carritoKey = `productos_carrito_${usuario.iduser}`;
        this.storage.setItem(carritoKey, this.productosCarrito)
          .then(() => {
            console.log('Carrito actualizado correctamente');
            this.calcularTotal();
          })
          .catch(error => console.error('Error al actualizar el carrito:', error));
      }
    });
  }

  calcularTotal() {
    this.subtotal = this.productosCarrito.reduce((total, producto) => {
      producto.subtotal = producto.precio * producto.cantidad;
      return total + producto.subtotal;
    }, 0);

    this.precioTotal = this.subtotal;

    if (this.descuento > 0) {
      const descuentoTotal = this.subtotal * (this.descuento / 100);
      this.precioTotal = Math.floor(this.subtotal - descuentoTotal);
    }

    this.storage.setItem('subtotal_carrito', this.subtotal);
    this.storage.setItem('precio_total_carrito', this.precioTotal);
  }

  aplicarCupon() {
    if (this.cupon === 'DESCUENTO10') {
      this.descuento = 10;
    } else if (this.cupon === 'DESCUENTO30') {
      this.descuento = 30;
    } else if (this.cupon === 'DESCUENTO50') {
      this.descuento = 50;
    } else {
      this.presentAlert('Error', 'El cupón no es válido');
      this.descuento = 0;
    }

    this.calcularTotal();
  }

  Pago() {
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => {
        return this.storage.setItem('precio_total_carrito', this.precioTotal);
      })
      .then(() => {
        this.router.navigate(['/pago']);
      })
      .catch(error => console.error('Error al preparar los datos para el pago', error));
  }

  irMenucaja() {
    this.storage.getItem('usuario').then(usuario => {
      if (usuario && usuario.iduser) {
        this.router.navigate(['/menu-caja']);
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(() => {
      this.router.navigate(['/login']);
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
