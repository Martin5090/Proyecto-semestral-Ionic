import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarcontraPage } from './cambiarcontra.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CambiarcontraPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarcontraPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CambiarcontraPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

