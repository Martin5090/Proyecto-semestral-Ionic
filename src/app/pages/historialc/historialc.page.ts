import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicesbd.service'; 
import { Detalle } from 'src/app/model/detalle';

@Component({
  selector: 'app-historialc',
  templateUrl: './historialc.page.html',
  styleUrls: ['./historialc.page.scss'],
})
export class HistorialcPage implements OnInit {
  detalles: Detalle[] = []; 

  constructor(private bd: ServicebdService) { }

  ngOnInit() {
   
    this.bd.seleccionarTodosLosDetalles(); 

    this.bd.fetchDetalle().subscribe(data => {
      console.log("Detalles cargados:", data); 
      this.detalles = data; 
    });
  }
}
