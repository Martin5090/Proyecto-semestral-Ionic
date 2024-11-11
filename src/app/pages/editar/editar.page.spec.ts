import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPage } from './editar.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController } from '@ionic/angular';

describe('EditarPage', () => {
  let fixture: ComponentFixture<EditarPage>;
  let component: EditarPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPage],
      imports: [RouterTestingModule],
      providers: [NativeStorage, ServicebdService, SQLite, AlertController]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPage);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Validación del campo nombre_producto cuando está vacío', () => {
    // Configura el campo nombre_producto vacío y el resto con datos válidos
    component.producto = {
      nombre_producto: '', // Campo vacío
      descripcion_producto: 'Descripción válida',
      foto_producto: 'foto.jpg',
      precio_producto: 100,
      stock_producto: 10,
      categoria_id: 1,
    };

    spyOn(component, 'presentAlert').and.callFake(() => Promise.resolve());

    component.Editar();

    expect(component.presentAlert).toHaveBeenCalledWith(
      'Campos incompletos',
      'Por favor, complete todos los campos.'
    );
  });
});
