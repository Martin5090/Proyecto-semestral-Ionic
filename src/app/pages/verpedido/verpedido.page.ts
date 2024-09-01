import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verpedido',
  templateUrl: './verpedido.page.html',
  styleUrls: ['./verpedido.page.scss'],
})
export class VerpedidoPage implements OnInit {

  constructor(private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  Confirmar(){
    this.presentToast('bottom');


  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Pedido confirmado, gracias por preferirnos.',
      duration: 2500,
      position: position,
      color: 'success'

    });

    await toast.present();
  }
}
