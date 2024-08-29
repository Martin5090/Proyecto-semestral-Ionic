import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.page.html',
  styleUrls: ['./hamburguesa.page.scss'],
})
export class HamburguesaPage {
  ingredientes = [
    { name: 'Tomate', selected: true },
    { name: 'Palta', selected: true },
    { name: 'Mayo', selected: true },
    { name: 'Pepinillos', selected: false }
  ];

  bebidas = ['Agua', 'Refresco', 'Jugo', 'Cerveza'];
  selectedBebida: string | undefined;

  confirmarOrden() {
    const seleccionados = this.ingredientes.filter(ingrediente => ingrediente.selected);
    console.log('Ingredientes seleccionados:', seleccionados);
    console.log('Bebida seleccionada:', this.selectedBebida);
  }
}
