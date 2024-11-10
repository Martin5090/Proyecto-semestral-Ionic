import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerpedidoPage } from './verpedido.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicesbd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('VerpedidoPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerpedidoPage],
      providers:[NativeStorage, ServicebdService, SQLite]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VerpedidoPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
