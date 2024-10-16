import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  productosCarrito: any[] = [];
  precioTotal: number = 0; 
  constructor(private storage: NativeStorage) { }

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
        this.calcularTotal(); // Actualiza el total después de eliminar
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
    this.precioTotal = this.productosCarrito.reduce((total, producto) => {
      return total + (producto.precio * producto.cantidad); // Suma el precio por cantidad
    }, 0);
  }
}
