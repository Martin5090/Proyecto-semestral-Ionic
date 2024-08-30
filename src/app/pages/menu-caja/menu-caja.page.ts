import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-caja',
  templateUrl: './menu-caja.page.html',
  styleUrls: ['./menu-caja.page.scss'],
})
export class MenuCajaPage implements OnInit {
  Tiposdecomida: any = [
    {
      id: 1,
      name: 'COMPLETO ITALIANO',
      description: 'hot dog el cual se sirve con palta, tomate y mayonesa, ofreciendo una combinación deliciosa.',
      image: 'https://i.postimg.cc/zv3WfHW0/completo.jpg',
      precio: '2500CLP'
    },

    {
      id: 2,
      name: 'CHACARERO',
      description: 'Está hecho con carne de vacuno, porotos verdes, tomate y ají verde. lo mejor de la gastronomía local.',
      image: 'https://i.postimg.cc/BQrDq6vB/chacarero.png',
      precio: '3500CLP'
    },

    {
      id: 3,
      name: 'EMPANADA DE PINO',
<<<<<<< HEAD
      description: 'Están rellenas con carne molida, cebolla, huevo duro, aceitunas y pasas. Perfectas para cualquier ocasión.',
      image: 'https://i.postimg.cc/PxSYhQLC/empanada-de-pino.webp',
      precio: '2000CLP'
=======
      description: 'Están rellenas con carne molida, cebolla, huevo duro, aceitunas y pasas. ',
      image: 'https://i.postimg.cc/PxSYhQLC/empanada-de-pino.webp'
>>>>>>> 23533f48b160804544ae74ca38c7e36d759a51f5
    },

    {
      id: 4,
      name: 'CHURRASCO ITALIANO',
      description: 'Sándwich que se prepara con carne de vacuno, acompañado de tomate, lechuga y mayonesa en un delicioso pan.',
      image: 'https://i.postimg.cc/W3NgQH4R/churrasco-italiano.jpg',
      precio: '3000CLP'
    },

    {
      id: 5,
      name: 'BARROS LUCO',
      description: 'Este sándwich que lleva carne de vacuno y queso derretido, una combinación simple pero increíblemente sabrosa.',
      image: 'https://i.postimg.cc/jjQy3btQ/barros-luco.jpg',
      precio: '2000CLP'
    },

    {
      id: 6,
      name: 'SOPAIPILLA',
      description: 'Es una masa frita tradicionalmente servida con pebre o con un toque de azúcar para un bocado dulce y crujiente.',
      image: 'https://i.postimg.cc/652nJRBQ/sopaipilla.jpg',
      precio: '500 CLP'
    },

    {
      id: 7,
      name: 'PAPAS FRITAS',
      description: 'Las papas fritas caseras son un acompañamiento perfecto para cualquier comida rápida.',
      image: 'https://i.postimg.cc/MZrVFt24/papasfrita.jpg',
      precio: '1500CLP'
    },

    {
      id: 8,
      name: 'EMPANADA DE QUESO',
      description: 'Empanada hecha con una masa crujiente y un relleno de queso fundido.',
      image: 'https://i.postimg.cc/pr7j5VJx/empanda-de-queso.jpg',
      precio: '1500CLP'
    }

    
  ];

  constructor() { }

  ngOnInit() {
  }

}
