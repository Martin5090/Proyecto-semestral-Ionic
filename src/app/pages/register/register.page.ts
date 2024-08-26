import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  nombre: string = "";
  apellido: string = "";
  correo: string = "";
  contra: string="";


  constructor(private router:Router) { }

  ngOnInit() {
  }
  irPagina(){
   
    
    this.router.navigate(['/inicio']);

  }
}
