import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  Tiposdecomida: any = [
    {
      id: 1,
      name: 'COMPLETO ITALIANO',
      description: 'hot dog el cual se sirve con palta, tomate y mayonesa, ofreciendo una combinación deliciosa.',
      image: 'https://i.postimg.cc/zv3WfHW0/completo.jpg',
      precio: 2500
    },

    {
      id: 2,
      name: 'CHACARERO',
      description: 'Está hecho con carne de vacuno, porotos verdes, tomate y ají verde. lo mejor de la gastronomía local.',
      image: 'https://i.postimg.cc/BQrDq6vB/chacarero.png',
      precio: 3500
    },

    {
      id: 3,
      name: 'EMPANADA DE PINO',
      description: 'Están rellenas con carne molida, cebolla, huevo duro, aceitunas y pasas. Perfectas para cualquier ocasión.',
      image: 'https://i.postimg.cc/PxSYhQLC/empanada-de-pino.webp',
      precio: 2000
    },

    {
      id: 4,
      name: 'CHURRASCO ITALIANO',
      description: 'Sándwich que se prepara con carne de vacuno, acompañado de tomate, lechuga y mayonesa en un delicioso pan.',
      image: 'https://i.postimg.cc/W3NgQH4R/churrasco-italiano.jpg',
      precio: 3000
    },

    {
      id: 5,
      name: 'BARROS LUCO',
      description: 'Este sándwich que lleva carne de vacuno y queso derretido, una combinación simple pero increíblemente sabrosa.',
      image: 'https://i.postimg.cc/jjQy3btQ/barros-luco.jpg',
      precio: 2000
    },

    {
      id: 6,
      name: 'SOPAIPILLA',
      description: 'Es una masa frita tradicionalmente servida con pebre o con un toque de azúcar para un bocado dulce y crujiente.',
      image: 'https://i.postimg.cc/652nJRBQ/sopaipilla.jpg',
      precio: 500
    },

    {
      id: 7,
      name: 'PAPAS FRITAS',
      description: 'Las papas fritas caseras son un acompañamiento perfecto para cualquier comida rápida.',
      image: 'https://phantom-marca.unidadeditorial.es/813d16708dc72860fd3cf319c9a245b5/resize/828/f/jpg/assets/multimedia/imagenes/2023/08/04/16911461030527.jpg',
      precio: 1500
    },

    {
      id: 8,
      name: 'EMPANADA DE QUESO',
      description: 'Empanada hecha con una masa crujiente y un relleno de queso fundido.',
      image: 'https://i.postimg.cc/pr7j5VJx/empanda-de-queso.jpg',
      precio: 1500
    },
    {
      id: 9,
      name: 'Chemilico',
      description: 'Un sándwich chileno delicioso con carne asada, lechuga fresca, tomate, cebolla y una salsa especial.',
      image: 'https://cocinachilena.cl/wp-content/uploads/2013/10/chemilico-sandwich-2-scaled.jpg',
      precio: 3000
    }

    
  ];

  constructor(private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  Eliminar(){
    this.presentToast('bottom');


  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'El producto se ha eliminado.',
      duration: 2500,
      position: position,
      color: 'danger'

    });

    await toast.present();
  }
}


