import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasInternacionalPage } from './noticias-internacional.page';

describe('NoticiasInternacionalPage', () => {
  let component: NoticiasInternacionalPage;
  let fixture: ComponentFixture<NoticiasInternacionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasInternacionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
