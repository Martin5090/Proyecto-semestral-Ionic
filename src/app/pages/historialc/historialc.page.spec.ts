import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialcPage } from './historialc.page';

describe('HistorialcPage', () => {
  let component: HistorialcPage;
  let fixture: ComponentFixture<HistorialcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
