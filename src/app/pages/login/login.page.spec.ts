import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('LoginPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
