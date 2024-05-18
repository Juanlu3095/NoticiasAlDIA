import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonList, IonListHeader, IonLabel, IonItem, IonCard, IonGrid, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { NewsApiService } from '../services/newsapi.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noticias-local',
  templateUrl: './noticias-local.page.html',
  styleUrls: ['./noticias-local.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonGrid, IonCard, IonThumbnail, IonItem, IonLabel, IonListHeader, IonList, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, HeaderComponent]
})
export class NoticiasLocalPage implements OnInit {

  noticias: any;
  lugar: string = 'malaga';

  constructor(private newsapi: NewsApiService) { }

  ngOnInit() {
    this.newsapi.getNewsByPlace(this.lugar).subscribe( noticias => {
      console.log(noticias);
      this.noticias = noticias;
    })
  }

}
