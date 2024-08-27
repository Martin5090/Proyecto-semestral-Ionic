import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-caja',
  templateUrl: './menu-caja.page.html',
  styleUrls: ['./menu-caja.page.scss'],
})
export class MenuCajaPage implements OnInit {
  Tiposdecomida: any = [
    
    { name: 'Hamburguesa', 
      description: 'Deliciosa hamburguesa con queso y tocino.', 
      image: 'assets/images/hamburguesa.jpg' },

    { name: 'Pizza', 
      description: 'Pizza napolitana con queso y pepperoni.', 
      image: 'assets/images/pizza.jpg' },

    { name: 'Tacos', 
      description: 'Tacos al pastor con piña y cilantro.', 
      image: 'assets/images/tacos.jpg' },

    { name: 'Hot Dog', 
      description: 'Hot dog con mostaza y ketchup.', 
      image: 'assets/images/hotdog.jpg' },

    { name: 'Papas Fritas', 
      description: 'Papas fritas crujientes con sal y ketchup.', 
      image: 'assets/images/papas.jpg' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
