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
    private router:Router
  ) { }

  ngOnInit() {

    this.storage.getItem('productos_carrito')
      .then((productos) => {
        this.productosCarrito = productos;
        this.calcularTotal();
      })
      .catch(() => {
        console.log('No hay productos en el carrito');
        this.productosCarrito = [];
      });

  }

  eliminarProducto(index: number) {
    this.productosCarrito.splice(index, 1);
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => {
        console.log('Producto eliminado correctamente');
        this.calcularTotal();
      })
      .catch(error => {
        console.error('Error al actualizar el carrito:', error);
      });
  }

  vaciarCarrito() {
    this.productosCarrito = [];
    this.precioTotal = 0;
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => {
        console.log('Carrito vaciado correctamente');
      })
      .catch(error => {
        console.error('Error al vaciar el carrito:', error);
      });
  }

  increaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad < producto.stock) {
      producto.cantidad++;
      this.calcularTotal();
      this.storage.setItem('productos_carrito', this.productosCarrito);
    } else {
      console.log('No hay suficiente stock disponible');
    }
  }




  decreaseQuantity(index: number) {
    const producto = this.productosCarrito[index];

    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.calcularTotal();
      this.storage.setItem('productos_carrito', this.productosCarrito);
    } else {
      console.log('No puedes disminuir más la cantidad, debe ser al menos 1');
    }
  }


  updateCarrito() {
    this.storage.setItem('productos_carrito', this.productosCarrito)
      .then(() => console.log('Carrito actualizado correctamente'))
      .catch(error => console.error('Error al actualizar el carrito', error));
  }

  calcularTotal() {
    // Calcular el subtotal de cada producto
    this.subtotal = this.productosCarrito.reduce((total, producto) => {
      producto.subtotal = producto.precio * producto.cantidad; // Guardar subtotal de cada producto
      return total + producto.subtotal; // Sumar al subtotal del carrito
    }, 0);

    this.precioTotal = this.subtotal;

    if (this.descuento > 0) {
      const descuentoTotal = this.subtotal * (this.descuento / 100);
      this.precioTotal = Math.floor(this.subtotal - descuentoTotal);
    }

    // Guardar el subtotal y el precio total en NativeStorage
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
