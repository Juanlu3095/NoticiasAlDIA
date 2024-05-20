import { Component, OnInit, LOCALE_ID } from '@angular/core';
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

  datosAemet: any;
  datosAemetRAW:any;
  selectedSegment: string = '0';

  constructor(private eltiempoapiservice: EltiempoapiService) { }

  ngOnInit() {
    this.eltiempoapiservice.getPrediccionMunicipio().subscribe( (respuesta: any) => {
      console.log(respuesta);
      this.datosAemet = respuesta[0].prediccion.dia;
      this.datosAemetRAW = respuesta[0];
      console.log(this.datosAemet);
      console.log('Estos son los datos RAW: ', this.datosAemetRAW)
    })
  }

  
}
