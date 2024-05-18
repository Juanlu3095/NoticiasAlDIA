import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EltiempoPage } from './eltiempo.page';

describe('EltiempoPage', () => {
  let component: EltiempoPage;
  let fixture: ComponentFixture<EltiempoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EltiempoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
