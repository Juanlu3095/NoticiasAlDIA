import { Component, OnInit } from '@angular/core';
import { IonText, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-eltiemponacional',
  templateUrl: './eltiemponacional.component.html',
  styleUrls: ['./eltiemponacional.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonItem,  IonText ]
})
export class EltiemponacionalComponent  implements OnInit {

  prediccionHoy: string;
  textoCorregidoHoy: string;
  textoCorregidoHoyFinal: string;
  errorMessage: string;

  constructor(private eltiemposervice: EltiempoapiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then( usuario => {
          if(usuario) {
            this.eltiemposervice.getPrediccionNacionalHoyconapi(usuario.apieltiempo).subscribe({
              next: (response) => {
                this.prediccionHoy = response;
                this.textoCorregidoHoy = this.prediccionHoy.replace(/(\.[^\.]*\.)/g, '$1<br><br>');
                this.textoCorregidoHoyFinal = this.textoCorregidoHoy.replace(/(?=A\.-)/g, '<br><br>');
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
