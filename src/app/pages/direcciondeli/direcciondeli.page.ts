import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-direcciondeli',
  templateUrl: './direcciondeli.page.html',
  styleUrls: ['./direcciondeli.page.scss'],
})
export class DirecciondeliPage implements OnInit {
  comuna: string = "";
  calle: string = "";

  constructor(private router: Router, 
    private alertController: AlertController) { }

  ngOnInit() {
  }

  aceptardireccion(){
  // Validar si los campos están vacíos
    if (this.comuna.trim() === "" || this.calle.trim() === "") {
      // Mostrar alerta si algún campo está vacío
      this.presentAlert('Error', 'Por favor, completa todos los campos.');
    } else {
      // Si los campos están completos, navega a la siguiente página
      this.router.navigate(['/menu-caja']);  
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
