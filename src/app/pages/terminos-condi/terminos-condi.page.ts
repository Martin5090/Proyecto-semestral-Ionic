import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-terminos-condi',
  templateUrl: './terminos-condi.page.html',
  styleUrls: ['./terminos-condi.page.scss'],
})
export class TerminosCondiPage implements OnInit {
  terms: any = {}; // Aquí guardaremos los términos y condiciones

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Llamada a la API para obtener los términos y condiciones
    this.apiService.getPosts().subscribe(
      (data) => {
        this.terms = data; // Asignar la respuesta a la variable `terms`
      },
      (error) => {
        console.error('Error al cargar los términos y condiciones:', error);
      }
    );
  }
}
