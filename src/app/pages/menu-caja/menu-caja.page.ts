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
      description: 'Este hot dog se sirve con palta, tomate y mayonesa, ofreciendo una combinación deliciosa y única de sabores frescos y cremosos.',
      image: 'https://i.postimg.cc/zv3WfHW0/completo.jpg'
    },

    {
      id: 2,
      name: 'CHACARERO',
      description: 'Está hecho con carne de vacuno, porotos verdes, tomate y ají verde. Es una explosión de sabores que representa lo mejor de la gastronomía local.',
      image: 'https://i.postimg.cc/BQrDq6vB/chacarero.png'
    },

    {
      id: 3,
      name: 'EMPANADA DE PINO',
      description: 'Están rellenas con carne molida, cebolla, huevo duro, aceitunas y pasas. Perfectas para cualquier ocasión.',
      image: 'https://i.postimg.cc/PxSYhQLC/empanada-de-pino.webp'
    },

    {
      id: 4,
      name: 'CHURRASCO ITALIANO',
      description: 'Este sándwich que se prepara con carne de vacuno a la plancha, acompañado de tomate, lechuga y mayonesa en un delicioso pan.',
      image: 'https://i.postimg.cc/W3NgQH4R/churrasco-italiano.jpg'
    },

    {
      id: 5,
      name: 'BARROS LUCO',
      description: 'Este sándwich que lleva carne de vacuno y queso derretido, una combinación simple pero increíblemente sabrosa.',
      image: 'https://i.postimg.cc/jjQy3btQ/barros-luco.jpg'
    },

    {
      id: 6,
      name: 'SOPAIPILLA',
      description: 'Es una masa frita tradicionalmente servida con pebre o con un toque de azúcar para un bocado dulce y crujiente.',
      image: 'https://i.postimg.cc/652nJRBQ/sopaipilla.jpg'
    },

    {
      id: 7,
      name: 'PAPAS FRITAS',
      description: 'Las papas fritas caseras son un acompañamiento perfecto para cualquier comida rápida, doradas y crujientes en cada bocado.',
      image: 'https://i.postimg.cc/MZrVFt24/papasfrita.jpg'
    },

    {
      id: 8,
      name: 'EMPANADA DE QUESO',
      description: 'Empanada hecha con una masa crujiente y un relleno de queso fundido.',
      image: 'https://i.postimg.cc/pr7j5VJx/empanda-de-queso.jpg'
    }

    
  ];

  constructor() { }

  ngOnInit() {
  }

}
