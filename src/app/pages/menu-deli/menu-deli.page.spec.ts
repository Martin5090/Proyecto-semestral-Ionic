import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDeliPage } from './menu-deli.page';

describe('MenuDeliPage', () => {
  let component: MenuDeliPage;
  let fixture: ComponentFixture<MenuDeliPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDeliPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
