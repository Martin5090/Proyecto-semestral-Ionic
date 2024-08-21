import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  correo: string = "";
  password: string = "";


  constructor(private router:Router) { }

  ngOnInit() {
  }

  irPagina(){
   
    //crear el codigo dque quiera de la logica
    this.router.navigate(['/inicio']);

  }

}

