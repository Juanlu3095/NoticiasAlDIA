import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonText, IonGrid, IonCard, IonItem, IonLabel, IonSpinner } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../services/newsapi.service';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-noticias-categoria',
  templateUrl: './noticias-categoria.page.html',
  styleUrls: ['./noticias-categoria.page.scss'],
  standalone: true,
  imports: [IonSpinner, IonThumbnail, IonLabel, IonItem, IonCard, IonGrid, IonText, IonContent, IonHeader, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export class NoticiasCategoriaPage implements OnInit {

  keyword: string | null;
  noticiasbycategoria: any;
  errorMessage: string;

  constructor(private activatedRoute: ActivatedRoute, private route: Router, private newsapi: NewsApiService, private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() {
    this.keyword = this.activatedRoute.snapshot.paramMap.get('keyword');

    if(this.keyword) {
      this.firebase.comprobarUsuario().then( uidUsuario => {
        if(uidUsuario) {
          this.firestore.getUsuario(uidUsuario).then( usuario => {
            if(usuario && this.keyword) {
              this.newsapi.getNewsByKeywordConApi(this.keyword, usuario.apinoticias).subscribe({
                next: (response) => {
                  this.noticiasbycategoria = response;
                },
                error: (error) => {
                  this.errorMessage = error;
                }
              })
            }
          })
        }
      })
    } else {
      this.route.navigate(['**']);
    }

  }

}
