import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //login variables
  correo: string = "";
  password: string = "";
  isLoggedIn: boolean = false; 
  isAdmin: boolean = false;

  constructor(private router: Router,
    private storage: NativeStorage,
    private alertController: AlertController) {

  }

  ngOnInit() {
    this.verificarEstadoSesion();
  }

  ionViewWillEnter() {
    this.verificarEstadoSesion();
  }

  verificarEstadoSesion() {
    
    this.storage.getItem('usuario').then(usuario => {
      if (usuario) {
        this.isLoggedIn = true;

        
        if (usuario.rol_id === 2) {
          this.isAdmin = true;  
        } else {
          this.isAdmin = false; 
        }
      } else {
        this.isLoggedIn = false; 
        this.isAdmin = false;    
      }
    }).catch(() => {
      this.isLoggedIn = false; 
      this.isAdmin = false;
    });
  }

  cerrarSesion() {
    const carritoKey = 'productos_carrito_' + 'id_del_usuario';  // Reemplaza 'id_del_usuario' por el valor dinámico si es necesario
  
    this.storage.remove('isLoggedIn')
      .then(() => this.storage.remove('usuario'))
      .then(() => this.storage.setItem(carritoKey, []))  // Vacía el carrito visible
      .then(() => {
        this.isLoggedIn = false; 
        this.router.navigate(['/inicio']); 
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
        this.presentAlert('Error', 'No se pudo cerrar sesión correctamente.');
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

