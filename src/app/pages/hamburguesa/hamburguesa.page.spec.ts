import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HamburguesaPage } from './hamburguesa.page';

describe('HamburguesaPage', () => {
  let component: HamburguesaPage;
  let fixture: ComponentFixture<HamburguesaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburguesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
