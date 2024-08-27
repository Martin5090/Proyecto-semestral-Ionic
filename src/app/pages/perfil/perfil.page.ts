import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //registro variables
  nombre: string = "";
  apellido: string = "";
  numero!: number;
  email: string = "";
  contra: string = "";
  
  constructor(private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nombre = this.router.getCurrentNavigation()?.extras?.
          state?.['nom'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.apellido = this.router.getCurrentNavigation()?.extras?.
          state?.['ape'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.numero = this.router.getCurrentNavigation()?.extras?.
          state?.['num'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.email = this.router.getCurrentNavigation()?.extras?.
          state?.['corre'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.contra = this.router.getCurrentNavigation()?.extras?.
          state?.['con'];
      }





    })
  }

  ngOnInit() {
  }

}
