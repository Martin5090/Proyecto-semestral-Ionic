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
  isLoggedIn: boolean = false; // Variable para verificar el estado de inicio de sesión

  constructor(private router: Router,
    private activedroute: ActivatedRoute,
    private storage: NativeStorage,
    private alertController: AlertController) {
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.correo = this.router.getCurrentNavigation()?.extras?.
          state?.['corr'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.password = this.router.getCurrentNavigation()?.extras?.
          state?.['pass'];
      }

    })

  }

  ngOnInit() {
    this.verificarEstadoSesion();
  }

  ionViewWillEnter() {
    this.verificarEstadoSesion();
  }

  verificarEstadoSesion() {
    
    this.storage.getItem('isLoggedIn').then(isLoggedIn => {
      this.isLoggedIn = isLoggedIn; 
    }).catch(() => {
      this.isLoggedIn = false; 
    });
  }

  cerrarSesion() {
    this.storage.remove('isLoggedIn').then(() => {
      this.storage.remove('userId').then(() => {
        this.isLoggedIn = false; 
        this.router.navigate(['/login']);
      });
    }).catch(error => {
      this.presentAlert('Error', 'No se pudo cerrar sesión.');
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

