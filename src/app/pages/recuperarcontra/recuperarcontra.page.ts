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
  respuesta:string="";


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
    // Aplicar trim() para eliminar espacios antes y después de los campos
    this.correo = this.correo.trim();
    this.respuesta = this.respuesta.trim();

    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    this.bd.verificarCorreo(this.correo).then(exists => {
      if (!exists) {
        this.presentAlert('Correo no registrado', 'El correo electrónico ingresado no está registrado.');
        return;
      }

      this.bd.verificarRespuesta(this.correo, this.respuesta).then(respuestaCorrecta => {
        if (!respuestaCorrecta) {
          this.presentAlert('Respuesta incorrecta', 'La respuesta ingresada no coincide con la registrada.');
          return;
        }

        this.storage.setItem('correoRecuperacion', this.correo).then(() => {
          this.presentAlert('Verificación exitosa', 'Puede proceder a cambiar su contraseña.');
          this.router.navigate(['/cambiarcontra']);
        }).catch(error => {
          this.presentAlert('Error', 'Ocurrió un error al guardar el correo. Por favor, inténtelo de nuevo.');
          console.error(error);
        });
      }).catch(error => {
        this.presentAlert('Error', 'Ocurrió un error al verificar la respuesta. Por favor, inténtelo de nuevo.');
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
