import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonList, IonListHeader, IonLabel, IonItem, IonCard, IonGrid, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
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
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonGrid, IonCard, IonThumbnail, IonItem, IonLabel, IonListHeader, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export class NoticiasLocalPage implements OnInit {

  noticias: any;
  lugar: string;

  constructor(private newsapi: NewsApiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then ( usuario => {
          if(usuario) {
            this.lugar = usuario.localidad;
            this.newsapi.getNewsByPlaceConApi(usuario.localidad, usuario.apinoticias).subscribe( noticias => {
              this.noticias = noticias;
            })
          }
        })
      }
    })
  }

}
