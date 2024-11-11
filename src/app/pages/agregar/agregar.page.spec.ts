import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPage } from './agregar.page';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { of } from 'rxjs';
import { Categoria } from 'src/app/model/categoria';

describe('AgregarPage', () => {
  let component: AgregarPage;
  let fixture: ComponentFixture<AgregarPage>;
  let alertController: AlertController;
  let alertSpy: jasmine.Spy;
  let bdServiceSpy: jasmine.SpyObj<ServicebdService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const bdServiceMock = jasmine.createSpyObj('ServicebdService', ['insertarProducto', 'MostrarCategoria', 'fetchCategoria']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AgregarPage],
      providers: [
        { provide: ServicebdService, useValue: bdServiceMock },
        { provide: Router, useValue: routerMock },
        AlertController,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarPage);
    component = fixture.componentInstance;
    alertController = TestBed.inject(AlertController);
    bdServiceSpy = TestBed.inject(ServicebdService) as jasmine.SpyObj<ServicebdService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    alertSpy = spyOn(alertController, 'create').and.returnValue(
      Promise.resolve({
        present: jasmine.createSpy('present'),
        dismiss: jasmine.createSpy('dismiss'),
      } as any)
    );

    bdServiceSpy.fetchCategoria.and.returnValue(of([]));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar una alerta si el campo nombre_producto está vacío', async () => {
    // Configuramos el estado del campo nombre_producto como vacío
    component.nombre_producto = '';
  
    // Ejecutamos la función Agregar()
    component.Agregar();
  
    // Verificamos que se haya mostrado la alerta por campo incompleto
    expect(alertSpy).toHaveBeenCalled();
  });

});
