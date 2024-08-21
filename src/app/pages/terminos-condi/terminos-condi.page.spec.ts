import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminosCondiPage } from './terminos-condi.page';

describe('TerminosCondiPage', () => {
  let component: TerminosCondiPage;
  let fixture: ComponentFixture<TerminosCondiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosCondiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
