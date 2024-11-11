import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {
    alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
    
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      providers: [
        NativeStorage,
        ServicebdService,
        SQLite,
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar alerta si algún campo obligatorio está vacío', async () => {
    component.nombre = "";
    component.apellido = "";
    component.telefono = 123456789; // Número válido
    component.correo = "";
    component.contra = "";
    component.recontra = "";
    component.respuesta = "";

    const alertSpy = spyOn(component, 'presentAlert');

    await component.irLogin();

    expect(alertSpy).toHaveBeenCalledWith('Campos incompletos', 'Por favor, complete todos los campos de forma correcta.');
  });
});
