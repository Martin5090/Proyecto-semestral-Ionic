import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Ingredientes } from 'src/app/model/ingredientes';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.page.html',
  styleUrls: ['./hamburguesa.page.scss'],
})
export class HamburguesaPage {

  producto: any = {};
  ingredientes: Ingredientes[] = []; 
  ingredienteSeleccionadoId!: number; 
  

  constructor(private router: Router, 
    private bd: ServicebdService, 
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    const productoId = this.route.snapshot.paramMap.get('id') || ''; 

    // Obtener el producto por ID
    this.bd.getProductoById(productoId).then(res => {
      this.producto = res;
    }).catch(err => {
      console.error('Error al obtener el producto:', err);
    });

    // Obtener la lista de ingredientes
    this.bd.seleccionarIngredientes().then(() => {
      this.bd.fetchIngredientes().subscribe(data => {
        this.ingredientes = data;
      });
    });
}
  



  cargarProducto() {
    
    
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
