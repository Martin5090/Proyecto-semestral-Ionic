import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HamburguesaPage } from './hamburguesa.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Crea un mock para ActivatedRoute
class ActivatedRouteMock {
  // Simula los parámetros de la ruta
  snapshot = { paramMap: { get: (key: string) => '123' } };
  params = of({ id: '123' });  // Simula el observable de parámetros
}

describe('HamburguesaPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HamburguesaPage],
      providers: [
        NativeStorage,
        ServicebdService,
        SQLite,
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }  // Provee el mock de ActivatedRoute
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HamburguesaPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
