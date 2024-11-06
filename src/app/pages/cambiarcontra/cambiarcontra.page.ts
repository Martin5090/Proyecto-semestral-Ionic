import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController} from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-cambiarcontra',
  templateUrl: './cambiarcontra.page.html',
  styleUrls: ['./cambiarcontra.page.scss'],
})
export class CambiarcontraPage implements OnInit {
  correo: string = "";
  contra: string = "";
  recontra: string = "";

  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage

  ) { }

  ngOnInit() {
    this.storage.getItem('correoRecuperacion').then((data) => {
      this.correo = data; 
    }).catch(error => {
      console.error('Error al cargar el correo:', error);
    });
  }



  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }


  CambiarContra() {
    // Aplicar trim a los campos de texto para eliminar espacios al principio y al final
    this.correo = this.correo.trim();
    this.contra = this.contra.trim();
    this.recontra = this.recontra.trim();
  
    if (!this.correo || !this.contra || !this.recontra) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
  
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.contra)) {
      this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }
  
    if (!passwordRegex.test(this.recontra)) {
      this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }
  
    // Verificar si las contraseñas coinciden
    if (this.contra !== this.recontra) {
      this.presentAlert('Contraseñas no coinciden', 'La contraseña y la confirmación de la contraseña deben coincidir.');
      return;
    }
  
    // Verificar si el correo coincide con el de la base de datos
    this.bd.verificarCorreo(this.correo).then(existe => {
      if (existe) {
        // Si el correo coincide, permitir el cambio de contraseña
        return this.bd.actualizarContra(this.correo, this.contra);
      } else {
        this.presentAlert('Correo no coincide', 'El correo no coincide con el registrado.');
        return Promise.reject('Correo no coincide');
      }
    }).then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Error al procesar el cambio de contraseña:', error);
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
