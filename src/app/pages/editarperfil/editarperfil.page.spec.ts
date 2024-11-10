import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarperfilPage } from './editarperfil.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('EditarperfilPage', () => {
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarperfilPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditarperfilPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
