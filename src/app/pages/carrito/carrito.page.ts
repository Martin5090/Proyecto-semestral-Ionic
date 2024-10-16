import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];

  constructor(private storage: NativeStorage) { }

  ngOnInit() {

    this.storage.getItem('productos_carrito')
      .then((productos) => {
        this.productosCarrito = productos;
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
      })
      .catch(error => {
        console.error('Error al actualizar el carrito:', error);
      });
  }

  vaciarCarrito() {

  }

  increaseQuantity(index: number) {
    this.productosCarrito[index].cantidad++;
  }
  
  decreaseQuantity(index: number) {
    if (this.productosCarrito[index].cantidad > 1) {
      this.productosCarrito[index].cantidad--;
    }
  }


}
