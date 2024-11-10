import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarPage } from './eliminar.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('EliminarPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EliminarPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
