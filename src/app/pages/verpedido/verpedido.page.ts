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
  
  
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  total_venta: number = 0; 
  productosUltimaVenta: any[] = []; 
  boletaActiva: boolean = false;  
  ventas: any[] = []; 

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
  
      this.bd.obtenerDatosUsuario(userId).then(datos => {
        if (datos) {
          this.nombre = datos.nombre;
          this.apellido = datos.apellido;
          this.direccion = `${datos.calle}, ${datos.comuna}`;
          this.telefono = datos.telefono;

          
          this.bd.obtenerVentasPorUsuario(userId).then(ventas => {
            if (ventas && ventas.length > 0) {
              this.ventas = ventas;
              this.boletaActiva = true;
            } else {
              console.warn('No se encontraron ventas para el usuario.');
              this.ventas = []; 
              this.boletaActiva = false; 
            }
          }).catch(e => {
            console.error('Error al obtener las ventas:', e);
            this.boletaActiva = false;
          });
        } else {
          this.boletaActiva = false;
        }
      }).catch(e => {
        console.error('Error al obtener los datos del usuario:', e);
        this.boletaActiva = false;
      });
    }).catch(e => {
      console.error('Error al obtener el ID del usuario:', e);
      this.boletaActiva = false;
    });
  }
  


  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message, 
      duration: 2500,
      position: position,
      color: 'success'
    });
  
    await toast.present();
  }
  
}
