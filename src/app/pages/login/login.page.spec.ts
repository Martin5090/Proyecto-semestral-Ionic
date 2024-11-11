import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers: [
        NativeStorage, 
        ServicebdService, 
        SQLite, 
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate']) },
        { provide: AlertController, useValue: jasmine.createSpyObj('AlertController', ['create']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Validación del campo correo cuando está vacío', () => {
    component.correo = "";  // Deja el campo correo vacío
    component.contra = "password123";  // Proporciona una contraseña válida

    spyOn(component, 'presentAlert');  // Espía el método presentAlert para verificar si se llama

    component.irInicio();  // Ejecuta la función

    // Comprueba que se muestra el mensaje de alerta esperado
    expect(component.presentAlert).toHaveBeenCalledWith('Error', 'Por favor, ingrese su correo y contraseña.');
  });
});
