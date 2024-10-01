import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router:Router, private bd: ServicebdService) { }

  ngOnInit() {
  }
  
  irMenudeli(){
   
    
    this.router.navigate(['/direcciondeli']);

  }
  irMenucaja(){
   
    
    this.router.navigate(['/menu-caja']);

  }
}
