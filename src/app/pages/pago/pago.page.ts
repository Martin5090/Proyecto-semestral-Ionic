import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  nombreusuario: string = '';
  numerotarjeta!:number;
  diaExpiracion: string = '';
  cvv: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Pagorealizado() {
   
    this.router.navigate(['/inicio']);
  }
  
    
}

