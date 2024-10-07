import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})
export class EditarperfilPage implements OnInit {
  iduser!: number;
  nombre:string="";
  apellido:string="";
  correo:string="";
  telefono!:number;
 

  constructor(private router: Router, 
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage) { }

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    try {
      const usuario = await this.storage.getItem('usuario');
      this.iduser = usuario.iduser; // Suponiendo que el objeto de usuario tiene la propiedad 'id'
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.correo = usuario.correo;
      this.telefono = usuario.telefono;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      // Manejar el error adecuadamente (redirigir, mostrar alerta, etc.)
    }
  }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  Aceptar() {

    if (!this.nombre || !this.apellido || !this.correo || !this.telefono) {
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
    

    this.bd.modificarUsuario(this.iduser, this.nombre, this.apellido, this.telefono, this.correo)
    .then(() => {
      this.router.navigate(['/perfil']);
    })
    .catch(error => {
      this.presentAlert('Error al modificar', 'Hubo un error al modificar el usuario. Inténtalo de nuevo.');
      console.error(error);
    });

  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Eliminar',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
        this.bd.eliminarUsuario(this.iduser.toString()); // Llama a la función de eliminación
        
      },
    },
  ];

  
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
    });

    await alert.present();
  }

  
  
}
