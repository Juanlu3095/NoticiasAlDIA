import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonText, IonLabel, IonItem, IonCard, IonGrid, IonSpinner } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { NewsApiService } from '../services/newsapi.service';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-noticias-local',
  templateUrl: './noticias-local.page.html',
  styleUrls: ['./noticias-local.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonGrid, IonCard, IonThumbnail, IonItem, IonLabel, IonText, IonContent, IonHeader, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export class NoticiasLocalPage implements OnInit {

  noticias: any;
  lugar: string;
  errorMessage: string;

  constructor(private newsapi: NewsApiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then ( usuario => {
          if(usuario) {
            this.lugar = usuario.localidad;
            this.newsapi.getNewsByPlaceConApi(usuario.localidad, usuario.apinoticias).subscribe({
              next: (respuesta) => {
                this.noticias = respuesta;
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
