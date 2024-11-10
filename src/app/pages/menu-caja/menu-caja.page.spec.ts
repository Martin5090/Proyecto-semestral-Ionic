import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCajaPage } from './menu-caja.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('MenuCajaPage', () => {
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuCajaPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MenuCajaPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
