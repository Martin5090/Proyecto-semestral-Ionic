import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = "";
  password: string = "";

  //registro variables
  nombre: string = "";
  apellido: string = "";
  numero!: number;
  email: string = "admin@gmail.com";
  contra: string = "Admin12345@";


  constructor(private router: Router, 
    private activedroute: ActivatedRoute,
    private toastController: ToastController,
    private alertController: AlertController
  ) {


    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombre = this.router.getCurrentNavigation()?.extras?.
          state?.['nom'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.apellido = this.router.getCurrentNavigation()?.extras?.
          state?.['ape'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.numero = this.router.getCurrentNavigation()?.extras?.
          state?.['num'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.email = this.router.getCurrentNavigation()?.extras?.
          state?.['corre'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.contra = this.router.getCurrentNavigation()?.extras?.
          state?.['con'];
      }






    })
  }

  ngOnInit() {
  }
  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  irInicio() {
    if (!this.correo || !this.password) {
      
      this.presentAlert('Error', 'Por favor, ingrese su correo y contraseña.');
    } else if (!this.isValidEmail(this.correo)) {
     
      this.presentAlert('Error', 'Por favor, ingrese un correo electrónico válido.');
    } else if (this.correo === this.email && this.password === this.contra) {

      let navigationextras: NavigationExtras = {
        state: {
          corr: this.correo,
          pass: this.password
  
        }
  
      }
      this.presentToast('top');
      this.router.navigate(['/perfil'], navigationextras);
      
    } else {
      
      this.presentAlert('Error', 'Credenciales incorrectas. Por favor, inténtelo de nuevo.');
    }
  }
    
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Usuario logeado con exito',
      duration: 2500,
      position: position,
      color: 'success'

    });

    await toast.present();
  }

}

