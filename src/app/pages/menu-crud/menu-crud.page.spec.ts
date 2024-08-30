import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuCrudPage } from './menu-crud.page';

describe('MenuCrudPage', () => {
  let component: MenuCrudPage;
  let fixture: ComponentFixture<MenuCrudPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
