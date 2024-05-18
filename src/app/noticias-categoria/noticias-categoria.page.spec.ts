import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasCategoriaPage } from './noticias-categoria.page';

describe('NoticiasCategoriaPage', () => {
  let component: NoticiasCategoriaPage;
  let fixture: ComponentFixture<NoticiasCategoriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasCategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
