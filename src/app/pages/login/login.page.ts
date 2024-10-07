import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //registro variables
  correo: string = "";
  contra: string = "";


  constructor(private router: Router,
    private alertController: AlertController,
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {
  }

  ngOnInit() {
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  irInicio() {
    if (!this.correo || !this.contra) {
      this.presentAlert('Error', 'Por favor, ingrese su correo y contraseña.');
    } else if (!this.isValidEmail(this.correo)) {
      this.presentAlert('Error', 'Por favor, ingrese un correo electrónico válido.');
    } else {
      // Verificar en la base de datos las credenciales
      this.bd.verificarUsuario(this.correo, this.contra).then((usuario) => {
        if (usuario) {
          // Credenciales correctas, guardar el iduser en NativeStorage
          this.storage.setItem('iduser', usuario.iduser)
            .then(() => {
              this.storage.setItem('isLoggedIn', true)
                .then(() => {
                  this.router.navigate(['/perfil']);
                });
            })
            .catch(error => {
              this.presentAlert('Error de almacenamiento', 'No se pudo guardar el usuario: ' + JSON.stringify(error));
            });
        } else {
          this.presentAlert('Error', 'Credenciales incorrectas. Por favor, inténtelo de nuevo.');
        }
      }).catch(error => {
        this.presentAlert('Error', 'Error al verificar el usuario: ' + JSON.stringify(error));
      });
    }
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

