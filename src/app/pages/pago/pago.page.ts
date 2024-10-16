import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  nombreusuario: string = '';
  numerotarjeta: string = '';
  diaExpiracion: string = ''; 
  cvv: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService
  ) { }

  ngOnInit() { }

  Pagorealizado() {
   
    if (!this.nombreusuario || !this.numerotarjeta || !this.diaExpiracion || !this.cvv) {
      this.presentAlert('Campos incompletos', 'Por favor, complete todos los campos.');
      return;
    }

   
    const nombreRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nombreRegex.test(this.nombreusuario)) {
      this.presentAlert('Nombre inválido', 'El nombre solo debe contener letras, espacios y guiones.');
      return;
    }

   
    if (this.numerotarjeta.length !== 16 || isNaN(Number(this.numerotarjeta))) {
      this.presentAlert('Número inválido', 'El número de la tarjeta debe ser válido y tener 16 dígitos.');
      return;
    }

    
    const [mesExpiracion, añoExpiracion] = this.diaExpiracion.split('/');
    const mesNumero = parseInt(mesExpiracion, 10);
    const añoNumero = parseInt(añoExpiracion, 10);

    if (isNaN(mesNumero) || isNaN(añoNumero) || mesNumero < 1 || mesNumero > 12 || añoExpiracion.length !== 2) {
      this.presentAlert('Fecha inválida', 'La fecha de expiración debe estar en formato MM/AA y ser válida.');
      return;
    }
    // Verificar CVV
    if (this.cvv.length !== 3 || isNaN(Number(this.cvv))) {
      this.presentAlert('CVV inválido', 'El CVV debe ser un número de exactamente 3 dígitos.');
      return;
    }

    
    this.presentAlert('Gracias por la compra', 'Su pago ha sido procesado exitosamente.');
    this.router.navigate(['/inicio']);
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
