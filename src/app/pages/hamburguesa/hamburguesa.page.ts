import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: './hamburguesa.page.html',
  styleUrls: ['./hamburguesa.page.scss'],
})
export class HamburguesaPage {

  producto: any = {};

  constructor(private router: Router, private bd: ServicebdService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const productoId = this.route.snapshot.paramMap.get('id') || ''; 
  
  this.bd.getProductoById(productoId).then(res => {
    this.producto = res;
  }).catch(err => {
    console.error('Error al obtener el producto:', err);
  });
  }



  cargarProducto() {
    
  }


}
