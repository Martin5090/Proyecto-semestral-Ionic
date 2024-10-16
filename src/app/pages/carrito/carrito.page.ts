import { Component, OnInit } from '@angular/core';
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
    private alertController: AlertController
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


    this.storage.getItem('cupon_aplicado')
      .then((cupon) => {
        if (cupon) {
          this.cupon = cupon;
          this.aplicarCupon();
        }
      })
      .catch(error => {
        console.error('No se encontró el cupón aplicado:', error);
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

    this.subtotal = this.productosCarrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad);
    }, 0);

    this.precioTotal = this.subtotal;


    if (this.descuento > 0) {
      const descuentoTotal = this.subtotal * (this.descuento / 100);
      this.precioTotal = Math.floor(this.subtotal - descuentoTotal);
    }
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


  pago(){
    
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
