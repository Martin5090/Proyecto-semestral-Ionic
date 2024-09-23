import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-direcciondeli',
  templateUrl: './direcciondeli.page.html',
  styleUrls: ['./direcciondeli.page.scss'],
})
export class DirecciondeliPage implements OnInit {
  direccion: string = "";
  constructor(private router: Router, 
    private alertController: AlertController) { }

  ngOnInit() {
  }

  aceptardireccion(){
    if (this.direccion.trim() === "") {
      this.presentAlert('Error', 'Debe ingresar una dirección.');
      return; // Detener la ejecución si la dirección está vacía
    }
  
    // Aquí puedes agregar la lógica que deseas ejecutar si la dirección no está vacía
    console.log('Dirección aceptada:', this.direccion);
    this.router.navigate(['/menu-caja']);  
  
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
