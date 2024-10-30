import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  telefono!: number;
  correo: string = "";
  contra: string = "";
  comuna_id!: number;
  rol_id: number = 1;
  respuesta: string = "";
  recontra: string = "";


  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService
    
  ) { }

  ngOnInit() {
  }


  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }


  irLogin() {
    // Verificar campos obligatorios
    if (!this.nombre || !this.apellido || !this.telefono || !this.correo || !this.contra || !this.recontra || !this.respuesta) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos de forma correcta.');
      return;
    }
  
    // Validar el formato del nombre
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombre)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }
  
    // Validar el formato del apellido
    if (!nombreRegex.test(this.apellido)) {
      this.presentAlert('Apellido inválido', 'El apellido solo debe contener letras, espacios y guiones.');
      return;
    }
  
    // Validar número de teléfono
    const telefonoStr = this.telefono.toString();
    if (isNaN(Number(this.telefono)) || this.telefono < 0 || telefonoStr.length < 8 || telefonoStr.length > 12) {
      this.presentAlert('Número inválido', 'El número de teléfono debe ser positivo, válido y tener entre 8 y 12 dígitos.');
      return;
    }
  
    // Validar el correo electrónico
    if (!this.validarEmail(this.correo)) {
      this.presentAlert('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
      return;
    }
  
    // Validar longitud de la contraseña
    if (this.contra.length < 8) {
      this.presentAlert('Contraseña corta', 'La contraseña debe tener al menos 8 caracteres.');
      return;
    }
  
    // Validar fortaleza de la contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.contra)) {
      this.presentAlert('Contraseña débil', 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.');
      return;
    }
  
    // Verificar si las contraseñas coinciden
    if (this.contra !== this.recontra) {
      this.presentAlert('Contraseñas no coinciden', 'Las contraseñas no coinciden.');
      return;
    }
  
    // Validar formato de la respuesta
    if (!nombreRegex.test(this.respuesta)) {
      this.presentAlert('Respuesta inválida', 'La respuesta solo debe contener letras, espacios y guiones.');
      return;
    }
  
    // Si todo es válido, insertar el usuario y navegar al login
    this.bd.insertarUsuario(this.nombre, this.apellido, this.telefono, this.correo, this.contra, this.comuna_id, this.rol_id, this.respuesta);
    this.router.navigate(['/login']);
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
