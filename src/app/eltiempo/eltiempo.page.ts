import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonMenu, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonSegmentButton, IonSegment, IonIcon, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonImg, IonRange, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { EltiempolocalComponent } from '../components/eltiempolocal/eltiempolocal.component';
import { EltiempoapiService } from '../services/eltiempoapi.service';

@Component({
  selector: 'app-eltiempo',
  templateUrl: './eltiempo.page.html',
  styleUrls: ['./eltiempo.page.scss'],
  standalone: true,
  imports: [IonButton,  IonImg, IonCol, IonRow, IonGrid, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonText, IonIcon, IonSegment, IonSegmentButton, IonMenu, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, EltiempolocalComponent]
})
export class EltiempoPage implements OnInit {

  selectedSegment: string = 'home';
  franjasHorarias: any = ['0-6h', '6-12h', '12-18h', '18-24h']

  constructor(private eltiempoapiservice: EltiempoapiService) { }

  segmentChanged(event: CustomEvent<any>) {
    this.selectedSegment = event.detail.value;
    console.log(this.selectedSegment);

    switch (this.selectedSegment) {

      case 'home':
      console.log('Estamos en el home');
      break;
      
      case 'local':
      console.log('Estamos en el heart');
      break;

      case 'pin':
      console.log('Estamos en el pin');
      break;

      case 'star':
      console.log('Estamos en el star');
      break;

      default:
      console.log('No se ha seleccionado nada');
    }
  }

  obtenerHora(ev: CustomEvent){
    console.log('ionChange emitted value:', ev.detail.value);
  }

  ngOnInit() {
    /* this.eltiempoapiservice.getPrediccionMunicipio().subscribe( (respuesta) => {
      console.log(respuesta);
    }) */
  }

}
