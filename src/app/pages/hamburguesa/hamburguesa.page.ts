import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Ingredientes } from 'src/app/model/ingredientes';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.page.html',
  styleUrls: ['./hamburguesa.page.scss'],
})
export class HamburguesaPage {

  producto: any = {};
  ingredientes: Ingredientes[] = [];
  ingredienteSeleccionadoId!: number;


  constructor(private router: Router,
    private bd: ServicebdService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private storage: NativeStorage

  ) {
  }

  ngOnInit() {
    const productoId = this.route.snapshot.paramMap.get('id') || '';

    // Obtener el producto por ID
    this.bd.getProductoById(productoId).then(res => {
      this.producto = res;
    }).catch(err => {
      console.error('Error al obtener el producto:', err);
    });

    // Obtener la lista de ingredientes
    this.bd.seleccionarIngredientes().then(() => {
      this.bd.fetchIngredientes().subscribe(data => {
        this.ingredientes = data;
      });
    });
  }




  cargarProducto() {
   // Definir los datos del producto para el carrito
   const productoParaCarrito = {
    id: this.producto.producto_id,
    nombre: this.producto.nombre_producto,
    precio: this.producto.precio_producto,
    foto: this.producto.foto_producto,
    stock: this.producto.stock_producto,
    cantidad: 1 // Inicia con 1 unidad del producto
  };

  // Obtener el carrito actual o crear uno nuevo
  this.storage.getItem('productos_carrito').then((productos: any[]) => {
    if (productos) {
      const productoExistente = productos.find(p => p.id === productoParaCarrito.id);

      if (productoExistente) {
        if (productoExistente.cantidad < productoExistente.stock) {
          productoExistente.cantidad++;
          productoExistente.precio += productoParaCarrito.precio; 
        } else {
          console.log('No se puede agregar más, se ha alcanzado el límite de stock');
        }
      } else {
        productos.push(productoParaCarrito);
      }

      this.storage.setItem('productos_carrito', productos)
        .then(() => {
          console.log('Producto añadido al carrito correctamente');
          this.presentAlert('Éxito', 'Producto añadido al carrito'); // Mostrar alerta
          this.router.navigate(['/menu-caja']); // Redirigir a menu-caja
        })
        .catch(error => console.error('Error al actualizar el carrito', error));
    } else {
      this.storage.setItem('productos_carrito', [productoParaCarrito])
        .then(() => {
          console.log('Carrito creado y producto añadido correctamente');
          this.presentAlert('Éxito', 'Producto añadido al carrito'); // Mostrar alerta
          this.router.navigate(['/menu-caja']); // Redirigir a menu-caja
        })
        .catch(error => console.error('Error al crear el carrito', error));
    }
  }).catch(() => {
    this.storage.setItem('productos_carrito', [productoParaCarrito])
      .then(() => {
        console.log('Carrito creado y producto añadido correctamente');
        this.presentAlert('Éxito', 'Producto añadido al carrito'); // Mostrar alerta
        this.router.navigate(['/menu-caja']); // Redirigir a menu-caja
      })
      .catch(error => console.error('Error al crear el carrito', error));
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
