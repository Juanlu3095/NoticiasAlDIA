import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonSegmentButton, IonSegment, IonText} from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { EltiempolocalComponent } from '../components/eltiempolocal/eltiempolocal.component';
import { EltiemponacionalComponent } from '../components/eltiemponacional/eltiemponacional.component';
import { EltiempoisobarasComponent } from '../components/eltiempoisobaras/eltiempoisobaras.component';

@Component({
  selector: 'app-eltiempo',
  templateUrl: './eltiempo.page.html',
  styleUrls: ['./eltiempo.page.scss'],
  standalone: true,
  imports: [ IonText, IonSegment, IonSegmentButton, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, HeaderComponent, EltiempolocalComponent, EltiemponacionalComponent, EltiempoisobarasComponent]
})
export class EltiempoPage implements OnInit {

  selectedSegment: string;

  constructor() { }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngOnInit() {
    this.selectedSegment = 'nacional';
  }

}
