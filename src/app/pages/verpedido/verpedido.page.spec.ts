import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerpedidoPage } from './verpedido.page';

describe('VerpedidoPage', () => {
  let component: VerpedidoPage;
  let fixture: ComponentFixture<VerpedidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
