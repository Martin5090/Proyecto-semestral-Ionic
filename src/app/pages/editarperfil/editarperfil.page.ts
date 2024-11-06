import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';  // Importa el plugin de la cámara

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
})

export class EditarperfilPage implements OnInit {
  iduser!: number;
  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  telefono!: number;
  rol_id!: number;

  // Variable para guardar la imagen
  imagen: any = 'assets/default-profile.png';

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage
  ) {}

  ngOnInit() {
    this.obtenerDatosUsuario().then(() => {
      this.cargarImagenPerfil();  
    });
  }

  async obtenerDatosUsuario() {
    try {
      const usuario = await this.storage.getItem('usuario');
      this.iduser = usuario.iduser; 
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.correo = usuario.correo;
      this.telefono = usuario.telefono;
      this.rol_id = usuario.rol_id;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  }

  validarEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  }

  Aceptar() {
    // Aplicar trim para eliminar espacios al principio y al final de los campos de texto
    this.nombre = this.nombre.trim();
    this.apellido = this.apellido.trim();
    this.correo = this.correo.trim();
  
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
  
    this.bd.modificarUsuario(this.iduser, this.nombre, this.apellido, this.telefono, this.correo, this.rol_id)
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
        this.bd.eliminarUsuario(this.iduser.toString()); 
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

 
  cargarImagenPerfil() {
    if (this.iduser) {
      this.storage.getItem(`profilePicture_${this.iduser}`).then((data) => {
        if (data) {
          this.imagen = data; 
        } else {
          console.log('No se encontró una imagen guardada para el usuario.');
        }
      }).catch((error) => {
        console.log("Error al cargar la imagen del usuario", error);
      });
    } else {
      console.error('Error: El iduser no está definido.');
    }
  }

  
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,  
    });

    this.imagen = image.webPath;

   
    if (this.iduser) {
      this.storage.setItem(`profilePicture_${this.iduser}`, this.imagen).then(() => {
        console.log('Imagen guardada exitosamente para el usuario con id:', this.iduser);
      }).catch((error) => {
        console.error('Error al guardar la imagen', error);
      });
    } else {
      console.error('Error: El iduser no está definido.');
    }
  }
}
