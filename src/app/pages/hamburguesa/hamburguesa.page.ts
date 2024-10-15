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
    // Definir los datos que quieres almacenar
    const productoParaCarrito = {
      nombre: this.producto.nombre_producto,
      precio: this.producto.precio_producto,
      foto: this.producto.foto_producto
    };

    // Obtener el carrito actual o crear uno nuevo
    this.storage.getItem('productos_carrito').then((productos: any[]) => {
      // Si ya hay productos en el carrito, añadir el nuevo producto
      productos.push(productoParaCarrito);

      // Actualizar el carrito en NativeStorage
      this.storage.setItem('productos_carrito', productos)
        .then(
          () => console.log('Producto añadido al carrito correctamente'),
          error => console.error('Error al añadir el producto al carrito', error)
        );

    }).catch(() => {
      // Si no hay productos en el carrito, crear un nuevo arreglo con el producto actual
      this.storage.setItem('productos_carrito', [productoParaCarrito])
        .then(
          () => console.log('Carrito creado y producto añadido correctamente'),
          error => console.error('Error al crear el carrito', error)
        );
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
