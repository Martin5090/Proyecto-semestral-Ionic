import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoPage } from './pago.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';

describe('PagoPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PagoPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

