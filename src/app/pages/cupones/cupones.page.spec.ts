import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuponesPage } from './cupones.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('CuponesPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuponesPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CuponesPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
