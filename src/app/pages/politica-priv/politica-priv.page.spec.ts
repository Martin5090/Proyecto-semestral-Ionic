import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticaPrivPage } from './politica-priv.page';

describe('PoliticaPrivPage', () => {
  let component: PoliticaPrivPage;
  let fixture: ComponentFixture<PoliticaPrivPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticaPrivPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
