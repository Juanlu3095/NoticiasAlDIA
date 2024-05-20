import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EltiempoisobarasComponent } from './eltiempoisobaras.component';

describe('EltiempoisobarasComponent', () => {
  let component: EltiempoisobarasComponent;
  let fixture: ComponentFixture<EltiempoisobarasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EltiempoisobarasComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EltiempoisobarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
