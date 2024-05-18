import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiaIndividualPage } from './noticia-individual.page';

describe('NoticiaIndividualPage', () => {
  let component: NoticiaIndividualPage;
  let fixture: ComponentFixture<NoticiaIndividualPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiaIndividualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
