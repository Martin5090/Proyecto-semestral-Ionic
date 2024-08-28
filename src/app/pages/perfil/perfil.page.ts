import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  //login variables
  correo: string = "";
  password: string = "";

  constructor(private router: Router,
    private activedroute: ActivatedRoute,) {
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.correo = this.router.getCurrentNavigation()?.extras?.
          state?.['corr'];
      }
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.password = this.router.getCurrentNavigation()?.extras?.
          state?.['pass'];
      }

    })

  }

  ngOnInit() {
  }

}
