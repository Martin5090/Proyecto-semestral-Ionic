import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = "admin";
  apellido: string = "admin";
  numero: number = 123456789123;
  email: string = "admin@gmail.com";
  contra: string = "admin12345";


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
    
    if (!this.nombre || !this.apellido || !this.numero || !this.email || !this.contra) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

    
    const numeroStr = this.numero.toString();
    if (isNaN(Number(this.numero)) || numeroStr.length > 12) {
      this.presentAlert('Número inválido', 'El número de teléfono debe ser válido y no exceder los 12 dígitos.');
      return;
    }

    
    if (!this.validarEmail(this.email)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    
    if (this.contra.length < 8) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
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

    this.presentToast('top');
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
      duration: 2500,
      position: position,
      color: 'success'

    });

    await toast.present();
  }
}
