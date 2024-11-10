import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirecciondeliPage } from './direcciondeli.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('DirecciondeliPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirecciondeliPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DirecciondeliPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
