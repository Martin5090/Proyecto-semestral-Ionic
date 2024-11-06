import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Cupones } from 'src/app/model/cupones';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {
  cupon: string = "";
  cuponesValidos: string[] = [];


  constructor(private router: Router,
    private alertController: AlertController,
    private bd: ServicebdService,
    private storage: NativeStorage) { }

  ngOnInit() {
 
    this.bd.seleccionarCupones();  
    this.bd.fetchCupones().subscribe((cupones: Cupones[]) => {
      this.cuponesValidos = cupones.map(cupon => cupon.nombre_cupon); 
    }, error => {
      console.error('Error al obtener los cupones:', error);
    });
  }

  Canjearcupon() {
    // Aplicar trim al campo de cupon para eliminar espacios al principio y al final
    this.cupon = this.cupon.trim();
  
    if (this.cuponesValidos.includes(this.cupon)) {
      this.presentAlert('¡Cupón válido!', 'El cupón sigue activo. ¡Puedes disfrutar de tu descuento!');
  
      this.storage.setItem('cupon_aplicado', this.cupon).then(() => {
        // Aquí puedes realizar otras acciones si es necesario
      }).catch(error => {
        console.error('Error al guardar el cupón en el storage', error);
      });
  
    } else {
      this.presentAlert('Cupón no válido', 'El cupón que has ingresado no es válido ya que no está o está caducado.');
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
