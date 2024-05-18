import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonGrid, IonCard, IonItem, IonLabel } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { NewsApiService } from '../services/newsapi.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-noticias-autonomica',
  templateUrl: './noticias-autonomica.page.html',
  styleUrls: ['./noticias-autonomica.page.scss'],
  standalone: true,
  imports: [IonThumbnail, IonLabel, IonItem, IonCard, IonGrid, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, RouterLink]
})
export class NoticiasAutonomicaPage implements OnInit {

  noticias: any;
  lugar: string = 'andalucia';

  constructor(private newsapi: NewsApiService) { }

  ngOnInit() {
    this.newsapi.getNewsByPlace(this.lugar).subscribe( noticias => {
      console.log(noticias);
      this.noticias = noticias;
    })
  }

}
