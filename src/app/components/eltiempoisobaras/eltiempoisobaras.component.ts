import { Component, OnInit } from '@angular/core';
import { IonImg, IonText, IonItem, IonSpinner } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-eltiempoisobaras',
  templateUrl: './eltiempoisobaras.component.html',
  styleUrls: ['./eltiempoisobaras.component.scss'],
  standalone: true,
  imports: [IonSpinner, IonItem, IonText, IonImg, ],
})
export class EltiempoisobarasComponent  implements OnInit {

  mapa: any;
  errorMessage: string;

  constructor(private eltiemposervice: EltiempoapiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then( usuario => {
          if(usuario) {
            this.eltiemposervice.getisobarasconapi(usuario.apieltiempo).subscribe({
              next: (response) => {
                this.mapa = URL.createObjectURL(response);
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
