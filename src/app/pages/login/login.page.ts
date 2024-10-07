import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController} from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

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
  email: string = "admin@gmail.comds";
  contra: string = "Admin12345@";


  constructor(private router: Router, 
    private alertController: AlertController,
    private storage: NativeStorage,
    private bd: ServicebdService
  ) {
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

      


      this.router.navigate(['/perfil']);
      
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


}

