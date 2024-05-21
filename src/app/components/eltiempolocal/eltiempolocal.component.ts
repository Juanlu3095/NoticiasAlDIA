import { Component, OnInit, LOCALE_ID, input, Input, AfterContentInit, AfterViewInit } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { IonCard, IonGrid, IonCardHeader, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonImg, IonCardContent, IonButton, IonRange, IonText } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-eltiempolocal',
  templateUrl: './eltiempolocal.component.html',
  styleUrls: ['./eltiempolocal.component.scss'],
  standalone: true,
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  imports: [IonText, IonRange, IonButton, IonCardContent, IonImg, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonCardHeader, IonGrid, IonCard, CommonModule]
})
export class EltiempolocalComponent  implements OnInit {
  
  datosAemet: any; // Guarda los datos de la api más fácilmente para iterar
  municipio: any; // Guarda el nombre del municipio desde la respuesta completa de la API

  // Con esta variable se pretendía obtener las franjas horarias de los datos meteorológicos, pero se tiene el problema de que en cada día tiene un formato distinto:
  // A partir del tercer día, no se muestran las 7 franjas horarias, sino sólo las 3 primeras por ejemplo.
  selectedSegment: string = '0';

  constructor(private eltiempoapiservice: EltiempoapiService) { }

  ngOnInit() {
  
    this.eltiempoapiservice.getPrediccionMunicipio().subscribe( (respuesta: any) => {
      this.datosAemet = respuesta[0].prediccion.dia;
      this.municipio = respuesta[0].nombre;
    })
  

  }
  
}
