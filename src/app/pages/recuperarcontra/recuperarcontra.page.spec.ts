import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontraPage } from './recuperarcontra.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RecuperarcontraPage', () => {
  let component: RecuperarcontraPage;
  let fixture: ComponentFixture<RecuperarcontraPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RecuperarcontraPage],
      providers: [
        NativeStorage,
        ServicebdService,
        SQLite,
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperarcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  
  it('debería mostrar alerta si el correo es inválido', () => {
    component.correo = "correo_invalido"; // Correo no válido
    component.respuesta = "respuesta";

    const alertSpy = spyOn(component, 'presentAlert');

    component.Ircontra();

    expect(alertSpy).toHaveBeenCalledWith('Correo inválido', 'Por favor, ingrese un correo electrónico válido.');
  });
});
