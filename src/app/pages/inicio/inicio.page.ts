import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private router:Router, 
    private bd: ServicebdService,
    private storage: NativeStorage) { }

    ngOnInit() {
      this.verificarEstadoSesion();
    }
  
    verificarEstadoSesion() {
      this.storage.getItem('usuario').then(usuario => {
        if (usuario && usuario.iduser) {
          console.log("Usuario logueado: ", usuario);
        } else {
          this.router.navigate(['/login']); 
        }
      }).catch(() => {
        this.router.navigate(['/login']); 
      });
    }
  
    insertarVentaYRedirigir(route: string, estado_id: number) {
      this.storage.getItem('usuario').then(usuario => {
        if (usuario && usuario.iduser) {
          this.bd.insertarVenta(usuario.iduser, estado_id).then(() => {
            this.router.navigate([route]);
          }).catch(error => {
            console.error('Error al insertar venta:', error);
          });
        } else {
          this.router.navigate(['/login']);
        }
      }).catch(() => {
        this.router.navigate(['/login']); 
      });
    }
  
    irMenudeli() {
      this.insertarVentaYRedirigir('/direcciondeli', 1);
    }
  
    irMenucaja() {
      this.insertarVentaYRedirigir('/menu-caja', 2);
    }
}
