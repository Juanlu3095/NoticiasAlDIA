import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticiasLocalPage } from './noticias-local.page';

describe('NoticiasLocalPage', () => {
  let component: NoticiasLocalPage;
  let fixture: ComponentFixture<NoticiasLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
