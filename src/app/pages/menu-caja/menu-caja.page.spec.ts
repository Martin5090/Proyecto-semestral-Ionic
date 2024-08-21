import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCajaPage } from './menu-caja.page';

describe('MenuCajaPage', () => {
  let component: MenuCajaPage;
  let fixture: ComponentFixture<MenuCajaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCajaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
