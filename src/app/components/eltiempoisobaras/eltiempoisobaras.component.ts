import { Component, OnInit } from '@angular/core';
import { IonImg } from '@ionic/angular/standalone';
import { EltiempoapiService } from 'src/app/services/eltiempoapi.service';
import { FirebaseService } from '../../services/firebase.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-eltiempoisobaras',
  templateUrl: './eltiempoisobaras.component.html',
  styleUrls: ['./eltiempoisobaras.component.scss'],
  standalone: true,
  imports: [IonImg, ],
})
export class EltiempoisobarasComponent  implements OnInit {

  mapa: any;

  constructor(private eltiemposervice: EltiempoapiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then( usuario => {
          if(usuario) {
            console.log('Este es el usuario: ', usuario);
            this.eltiemposervice.getisobarasconapi(usuario.apieltiempo).subscribe({
              next: (response) => {
                this.mapa = URL.createObjectURL(response);
              },
              error: (error) => {
                console.log('Éste es el error: ', error)
              }
            })
          }
        })
      }
    })
  }

}
