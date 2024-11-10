import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarcontraPage } from './recuperarcontra.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RecuperarcontraPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarcontraPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RecuperarcontraPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
