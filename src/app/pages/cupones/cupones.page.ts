import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {
  cupon: string = "";
  cuponValido: string = "DESCUENTO50";  

  constructor(private router: Router, 
    private alertController: AlertController) { }

  ngOnInit() {}

  Canjearcupon() {
    if (this.cupon === this.cuponValido) {
      // Si el cupón es válido, muestra un mensaje de éxito
      this.presentAlert('¡Cupón válido!', 'El cupón ha sido aplicado correctamente. ¡Disfruta de tu descuento!');
    } else {
      // Si el cupón es incorrecto, muestra un mensaje de error
      this.presentAlert('Cupón no válido', 'El cupón que has ingresado no es válido. Por favor, verifica el código e intenta de nuevo.');
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
