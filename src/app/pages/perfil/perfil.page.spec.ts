import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('PerfilPage', () => {
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers:[NativeStorage]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PerfilPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
