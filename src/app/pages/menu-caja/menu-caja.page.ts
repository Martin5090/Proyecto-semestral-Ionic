import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-menu-caja',
  templateUrl: './menu-caja.page.html',
  styleUrls: ['./menu-caja.page.scss'],
})
export class MenuCajaPage implements OnInit {
  Tiposdecomida: any = [];

  constructor(
    private router: Router,
    private bd: ServicebdService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
     
     this.bd.dbState().subscribe(data => {
      if (data) {
        
        this.bd.fetchProductoT().subscribe(res => {
          this.Tiposdecomida = res; 
        });
        
       
        this.bd.seleccionarProductoT();
      }
    });
  }
}
