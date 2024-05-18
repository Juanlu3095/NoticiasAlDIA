import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasNacionalPage } from './noticias-nacional.page';

describe('NoticiasNacionalPage', () => {
  let component: NoticiasNacionalPage;
  let fixture: ComponentFixture<NoticiasNacionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasNacionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
