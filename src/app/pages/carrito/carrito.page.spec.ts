import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CarritoPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CarritoPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
