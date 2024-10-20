import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Comuna } from 'src/app/model/comuna';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-direcciondeli',
  templateUrl: './direcciondeli.page.html',
  styleUrls: ['./direcciondeli.page.scss'],
})
export class DirecciondeliPage implements OnInit {
  comunas: Comuna[] = [];
  comunaSeleccionadaId!: number; // ID de la comuna seleccionada
  userId!: number; // ID del usuario que ha iniciado sesión
    // Variables para almacenar las coordenadas
    latitud: number | null = null;
    longitud: number | null = null;
  
  

  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage,
    private toastController: ToastController) { }

  ngOnInit() {

    // Cargar las comunas al inicializar el componente
    this.bd.seleccionarComuna().then(() => {
      this.bd.fetchComuna().subscribe(data => {
        this.comunas = data;
      });
    });

    // Obtener el ID del usuario que ha iniciado sesión
    this.storage.getItem('usuario').then(data => {
      this.userId = data.iduser; // Asegúrate de que 'iduser' es la propiedad correcta
    }).catch(error => {
      console.error('Error al obtener el ID del usuario:', error);
    });


  }



  actualizarComuna() {
    if (!this.comunaSeleccionadaId) {
      this.presentAlert('Comuna no seleccionada', 'Por favor, seleccione una comuna.');
      return;
    }

    
    this.bd.actualizarComunaUsuario(this.userId, this.comunaSeleccionadaId)
      .then(() => {
        this.presentAlert('Éxito', 'La comuna ha sido actualizada.'); 
        this.router.navigate(['/menu-caja']); 
      })
      .catch((error) => {
        console.error('Error al actualizar la comuna:', error);
        this.presentAlert('Error', 'No se pudo actualizar la comuna. Inténtalo de nuevo.');
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

  async obtenerUbicacion() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.latitud = position.coords.latitude;
      this.longitud = position.coords.longitude;

      // Mostrar notificación (toast) con la latitud y longitud
      this.mostrarToast(`Ubicación obtenida: Latitud ${this.latitud}, Longitud ${this.longitud}. Dirección actualizada correctamente.`);
    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
      this.mostrarToast('Error obteniendo la ubicación. Intente nuevamente.');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,  // Duración de 3 segundos
      position: 'bottom'  // Posición del toast
    });
    toast.present();
  }

  actualizarComunaa() {
    // Lógica para actualizar la comuna o dirección según la selección del usuario
    console.log('Comuna actualizada:', this.comunaSeleccionadaId);
  }
}

