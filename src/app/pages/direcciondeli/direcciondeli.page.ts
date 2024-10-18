import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Comuna } from 'src/app/model/comuna';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-direcciondeli',
  templateUrl: './direcciondeli.page.html',
  styleUrls: ['./direcciondeli.page.scss'],
})
export class DirecciondeliPage implements OnInit {
  comunas: Comuna[] = [];
  comunaSeleccionadaId!: number; // ID de la comuna seleccionada
  userId!: number; // ID del usuario que ha iniciado sesión

  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage) { }

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
}
