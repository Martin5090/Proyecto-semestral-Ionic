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

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private storage: NativeStorage
  ) {}

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
    const productoParaCarrito = {
      id: this.producto.producto_id,
      nombre: this.producto.nombre_producto,
      precio: this.producto.precio_producto,
      foto: this.producto.foto_producto,
      stock: this.producto.stock_producto,
      cantidad: 1
    };

    // Obtener el objeto de usuario logueado
    this.storage.getItem('usuario').then((usuario: any) => {
      if (usuario) {
        const iduser = usuario.iduser;  // Extraer el iduser del objeto de usuario
        console.log('ID del usuario logueado:', iduser); // Mostrar iduser en la consola

        const carritoKey = `productos_carrito_${iduser}`;

        // Obtener el carrito actual o crear uno nuevo
        this.storage.getItem(carritoKey).then((productos: any[]) => {
          if (productos) {
            // Verificar si el producto ya está en el carrito
            const productoExistente = productos.find(p => p.id === productoParaCarrito.id);
            
            if (productoExistente) {
              // Si el producto ya está en el carrito, aumentar la cantidad si hay stock disponible
              if (productoExistente.cantidad < productoExistente.stock) {
                productoExistente.cantidad++; // Incrementar la cantidad
              } else {
                console.log('No se puede agregar más, se ha alcanzado el límite de stock');
                this.presentAlert('Advertencia', 'No se puede agregar más, se ha alcanzado el límite de stock.');
              }
            } else {
              // Si el producto no está en el carrito, agregarlo
              productos.push(productoParaCarrito);
            }

            // Actualizar el carrito
            this.storage.setItem(carritoKey, productos)
              .then(() => {
                console.log('Producto añadido al carrito correctamente');
                this.presentAlert('Éxito', 'Producto añadido al carrito');
                this.router.navigate(['/menu-caja']);
              })
              .catch(error => {
                console.error('Error al actualizar el carrito', error);
                this.presentAlert('Error', 'Hubo un problema al actualizar el carrito.');
              });
          } else {
            // Si no hay carrito guardado, creamos uno vacío
            this.storage.setItem(carritoKey, [productoParaCarrito])
              .then(() => {
                console.log('Carrito creado y producto añadido correctamente');
                this.presentAlert('Éxito', 'Producto añadido al carrito');
                this.router.navigate(['/menu-caja']);
              })
              .catch(error => {
                console.error('Error al crear el carrito', error);
                this.presentAlert('Error', 'Hubo un problema al crear el carrito.');
              });
          }
        }).catch(() => {
          // Si no se puede obtener el carrito, lo creamos vacío
          this.storage.setItem(carritoKey, [productoParaCarrito])
            .then(() => {
              console.log('Carrito creado y producto añadido correctamente');
              this.presentAlert('Éxito', 'Producto añadido al carrito');
              this.router.navigate(['/menu-caja']);
            })
            .catch(error => {
              console.error('Error al crear el carrito', error);
              this.presentAlert('Error', 'Hubo un problema al crear el carrito.');
            });
        });
      } else {
        console.error('No se encontró el objeto de usuario logueado');
        this.presentAlert('Error', 'No se encontró el usuario logueado.');
      }
    }).catch(error => {
      console.error('Error al obtener el objeto de usuario logueado', error);
      this.presentAlert('Error', 'Hubo un problema al verificar la sesión del usuario.');
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
