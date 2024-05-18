import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonGrid, IonCard, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../services/newsapi.service';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-noticias-categoria',
  templateUrl: './noticias-categoria.page.html',
  styleUrls: ['./noticias-categoria.page.scss'],
  standalone: true,
  imports: [IonThumbnail, IonLabel, IonItem, IonCard, IonGrid, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export class NoticiasCategoriaPage implements OnInit {

  keyword: string | null;

  noticiasbycategoria: any;

  constructor(private activatedRoute: ActivatedRoute, private newsapi: NewsApiService) { }

  ngOnInit() {
    this.keyword = this.activatedRoute.snapshot.paramMap.get('keyword');

    if(this.keyword) {
    this.newsapi.getNewsByKeyword(this.keyword).subscribe( (respuesta) => {
      this.noticiasbycategoria = respuesta;
      console.log('Esta es la categoría elegida:', this.keyword)
      console.log(this.noticiasbycategoria);
    })
    } else {
      console.log('Error');
    }

  }

}
