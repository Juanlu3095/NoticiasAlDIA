import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { IonCard, IonGrid, IonCardHeader, IonRow, IonCol, IonCardTitle, IonCardSubtitle, IonImg, IonCardContent, IonText, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-eltiempolocal',
  templateUrl: './eltiempolocal.component.html',
  styleUrls: ['./eltiempolocal.component.scss'],
  standalone: true,
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  imports: [IonSpinner, IonItem, IonText, IonCardContent, IonImg, IonCardSubtitle, IonCardTitle, IonCol, IonRow, IonCardHeader, IonGrid, IonCard, CommonModule]
})
export class EltiempolocalComponent  implements OnInit {
  
  datosAemet: any; // Guarda los datos de la api más fácilmente para iterar
  municipio: any; // Guarda el nombre del municipio desde la respuesta completa de la API
  errorMessage: string;

  // Con esta variable se pretendía obtener las franjas horarias de los datos meteorológicos, pero se tiene el problema de que en cada día tiene un formato distinto:
  // A partir del tercer día, no se muestran las 7 franjas horarias, sino sólo las 3 primeras por ejemplo.
  selectedSegment: string = '0';

  constructor(private eltiempoapiservice: EltiempoapiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then( usuario => {
          if(usuario) {
            this.eltiempoapiservice.getPrediccionMunicipioconapi(usuario.apieltiempo, usuario.municipioeltiempo).subscribe({
              next: (response:any) => {
                this.datosAemet = response[0].prediccion.dia;
                this.municipio = response[0].nombre;
              },
              error: (error) => {
                this.errorMessage = error;
              }
            })
          }
        })
      }
    })

  }
  
}
