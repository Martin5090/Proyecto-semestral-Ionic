import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TerminosCondiPage } from './terminos-condi.page';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TerminosCondiPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminosCondiPage],
      providers:[ApiService, HttpClient, HttpHandler]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TerminosCondiPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
