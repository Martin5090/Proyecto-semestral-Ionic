import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  id: string = "";
  nombre: string = "";
  descripcion: string = "";
  imagen: string = "";
  precio!: number;
  constructor(private router: Router,
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  //sirve para hacer que aprezca el boton de archivo de imagen en el imput


  Agregar() {
    if (!this.nombre || !this.descripcion || !this.imagen || !this.precio) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombre)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }
    if (!nombreRegex.test(this.descripcion)) {
      this.presentAlert('Descripción inválida', 'La descripción solo debe contener letras, espacios y guiones.');
      return;
    }

    const numeroStr = this.precio.toString();
    if (isNaN(Number(this.precio)) || numeroStr.length > 5 ) {
      this.presentAlert('Número inválido', 'Debe ingresar un precio apropiado y menor a los 5 digitos o igual .');
      return;
    };



    this.presentToast('top');
    this.router.navigate(['/menu-crud']);

  };





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
