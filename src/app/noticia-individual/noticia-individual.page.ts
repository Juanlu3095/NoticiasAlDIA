import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonItem, IonLabel, IonCard, IonGrid, IonText, IonImg, IonButtons, IonBackButton, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../services/newsapi.service';
import { HeaderComponent } from '../header/header.component';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-noticia-individual',
  templateUrl: './noticia-individual.page.html',
  styleUrls: ['./noticia-individual.page.scss'],
  standalone: true,
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  imports: [IonSpinner, IonBackButton, IonButtons, IonImg, IonText, IonGrid, IonCard, IonLabel, IonItem, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class NoticiaIndividualPage implements OnInit{

  url: any; // Puede ser un valor nulo
  noticia: any;
  contenido: any;
  fecha:Date;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private Newsapi: NewsApiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.paramMap.get('url'); // La API pide la url de la noticia para extraerla

    this.firebase.comprobarUsuario().then( uidUsuario => {
      if(uidUsuario) {
        this.firestore.getUsuario(uidUsuario).then( usuario => {
          if(usuario) {
            this.Newsapi.getIndividualNewConApi(this.url, usuario.apinoticias).subscribe({
              next: (respuesta) => {
                this.noticia = respuesta;
                this.contenido = this.noticia.text.replace(/(\.[^\.]*\.)/g, '$1<br><br>');
      
                // Convertir fecha al formato español: DD-MM-AAAA - HH-MM
                this.fecha = this.noticia.publish_date;
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
