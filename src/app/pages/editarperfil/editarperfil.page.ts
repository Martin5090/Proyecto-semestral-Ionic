import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  nombre:string="admin";
  apellido:string="admin";
  correo:string="admin@gmail.com";
  telefono:number=123456789123
 

  constructor(private router: Router, 
    private toastController: ToastController,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  Aceptar() {

    if (!this.nombre || !this.apellido || !this.correo || !this.correo || !this.telefono) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;

    if (!nombreRegex.test(this.nombre)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }

    if (!nombreRegex.test(this.apellido)) {
      this.presentAlert('Apellido inválido', 'El apellido solo debe contener letras, espacios y guiones.');
      return;
    }

    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const numeroStr = this.telefono.toString();
    if (isNaN(Number(this.telefono)) || numeroStr.length > 12 || numeroStr.length < 6) {
      this.presentAlert('Número inválido', 'El número de teléfono debe ser válido y tener entre 6 y 12 dígitos.');
      return;
    }
    
    this.presentToast('top');
    this.router.navigate(['/perfil']);


  }

  Eliminar() {

    this.presentAlert('¿Está seguro de que desea eliminar la cuenta?', 'Esta acción no se puede deshacer.');


  }

  
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['NO ELIMINAR'] ,
      
    });

    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Información actualizada correctamente.',
      duration: 2500,
      position: position,
      color: 'success'

    });

    await toast.present();
  }

  
  
}
