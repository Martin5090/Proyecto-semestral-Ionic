import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPage } from './agregar.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AgregarPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
