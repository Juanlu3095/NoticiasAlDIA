import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenu, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSegmentButton, IonSegment, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonRange, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { EltiempolocalComponent } from '../components/eltiempolocal/eltiempolocal.component';
import { EltiemponacionalComponent } from '../components/eltiemponacional/eltiemponacional.component';
import { EltiempoisobarasComponent } from '../components/eltiempoisobaras/eltiempoisobaras.component';

@Component({
  selector: 'app-eltiempo',
  templateUrl: './eltiempo.page.html',
  styleUrls: ['./eltiempo.page.scss'],
  standalone: true,
  imports: [IonButton,  IonImg, IonCol, IonRow, IonGrid, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonText, IonIcon, IonSegment, IonSegmentButton, IonMenu, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, EltiempolocalComponent, EltiemponacionalComponent, EltiempoisobarasComponent]
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
