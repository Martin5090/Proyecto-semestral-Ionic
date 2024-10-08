import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-recuperarcontra',
  templateUrl: './recuperarcontra.page.html',
  styleUrls: ['./recuperarcontra.page.scss'],
})
export class RecuperarcontraPage implements OnInit {
  correo: string = "";


  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage  

  ) { }

  ngOnInit() {
  }
  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  Ircontra() {
    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    
    this.bd.verificarCorreo(this.correo).then(exists => {
      if (!exists) {
        this.presentAlert('Correo no registrado', 'El correo electrónico ingresado no está registrado.');
        return;
      }

      
      this.storage.setItem('correoRecuperacion', this.correo).then(() => {
        
        this.presentAlert('Verificación de correo', 'Por favor, verifique su correo para recuperar su contraseña.');

        
        this.router.navigate(['/cambiarcontra']);
      }).catch(error => {
        this.presentAlert('Error', 'Ocurrió un error al guardar el correo. Por favor, inténtelo de nuevo.');
        console.error(error);
      });
    }).catch(error => {
      this.presentAlert('Error', 'Ocurrió un error al verificar el correo. Por favor, inténtelo de nuevo.');
      console.error(error);
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
