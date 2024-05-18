import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasAutonomicaPage } from './noticias-autonomica.page';

describe('NoticiasAutonomicaPage', () => {
  let component: NoticiasAutonomicaPage;
  let fixture: ComponentFixture<NoticiasAutonomicaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasAutonomicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
