import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  numero!: number;
  email: string = "";
  contra: string = "";


  constructor(private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }
  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }


  irLogin() {
    // Validar que todos los campos estén llenos
    if (!this.nombre || !this.apellido || !this.numero || !this.email || !this.contra) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    // Validar que el número sea un número válido
    if (isNaN(Number(this.numero))) {
      this.presentAlert('Número inválido', 'El número de teléfono debe ser válido.');
      return;
    }

    // Validar formato del correo electrónico
    if (!this.validarEmail(this.email)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    // Validar longitud de la contraseña
    if (this.contra.length < 6) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    let navigationextras: NavigationExtras = {
      state: {
        nom: this.nombre,
        ape: this.apellido,
        num: this.numero,
        corre: this.email,
        con: this.contra

      }

    };

    this.presentToast('bottom');
    this.router.navigate(['/login'], navigationextras);

  }


  //PresentAlert
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  //Alerta Toast
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Usuario registrado con exito',
      duration: 2000,
      position: position,
      color: 'success'

    });

    await toast.present();
  }
}
