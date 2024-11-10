import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPage } from './editar.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditarPage', () => {
  let fixture: ComponentFixture<EditarPage>;
  let app: EditarPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarPage],
      imports: [RouterTestingModule], // Importa RouterTestingModule para simular ActivatedRoute
      providers: [NativeStorage, ServicebdService, SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPage);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
