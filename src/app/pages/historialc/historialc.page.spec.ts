import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialcPage } from './historialc.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('HistorialcPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialcPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HistorialcPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
