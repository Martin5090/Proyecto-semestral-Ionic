import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-verpedido',
  templateUrl: './verpedido.page.html',
  styleUrls: ['./verpedido.page.scss'],
})
export class VerpedidoPage implements OnInit {
  
  // Variables para almacenar los datos del usuario
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  total_venta: number = 0; 
  productosUltimaVenta: any[] = []; 
  boletaActiva: boolean = false;  

  constructor(
    private router: Router,
    private toastController: ToastController,
    private bd: ServicebdService,
    private nativeStorage: NativeStorage 
  ) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    this.nativeStorage.getItem('usuario').then(usuario => {
      const userId = usuario.iduser;

      // Obtener datos del usuario
      this.bd.obtenerDatosUsuario(userId).then(datos => {
        if (datos) {
          this.nombre = datos.nombre;
          this.apellido = datos.apellido;
          this.direccion = `${datos.calle}, ${datos.comuna}`;
          this.telefono = datos.telefono;
          this.boletaActiva = true;

          // Obtener última venta
          this.bd.obtenerUltimaVenta(userId).then(venta => {
            if (venta) {
              this.total_venta = venta.total_venta;
              this.productosUltimaVenta = venta.productos || [];
            } else {
              console.warn('No se encontraron ventas para el usuario.');
              this.boletaActiva = false; // No hay venta, no mostrar boleta
            }
          }).catch(e => {
            console.error('Error al obtener la última venta:', e);
          });
        } else {
          this.boletaActiva = false; // No hay datos del usuario
        }
      }).catch(e => {
        console.error('Error al obtener los datos del usuario:', e);
      });
    }).catch(e => {
      console.error('Error al obtener el ID del usuario:', e);
      this.boletaActiva = false; // No se pudo obtener el ID del usuario
    });
  }

  Confirmar() {
    this.presentToast('bottom').then(() => {
      
      this.nativeStorage.remove('ventaActiva').then(() => {
        console.log('Venta eliminada del almacenamiento local');
      }).catch(e => {
        console.error('Error al eliminar la venta del almacenamiento local', e);
      });
  
      // Desactivar boleta y vaciar datos locales
      this.boletaActiva = false; 
      this.total_venta = 0; 
      this.productosUltimaVenta = []; 
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Pedido confirmado, gracias por preferirnos.',
      duration: 2500,
      position: position,
      color: 'success'
    });

    await toast.present();
  }
}
