import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  irMenudeli(){
   
    //crear el codigo dque quiera de la logica
    this.router.navigate(['/menu-deli']);

  }
  irMenucaja(){
   
    //crear el codigo dque quiera de la logica
    this.router.navigate(['/menu-caja']);

  }
}
