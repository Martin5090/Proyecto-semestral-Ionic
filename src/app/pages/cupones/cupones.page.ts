import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {
  cupon:string = "";

  constructor(private router:Router, 
    private alertController: AlertController) { }

  ngOnInit() {
  
  }
  irPagina(){
    
    this.presentAlert('Cupón no valido', 'El cupón que has ingresado no es válido. Por favor, verifica el código e intenta de nuevo.');

  }
  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
