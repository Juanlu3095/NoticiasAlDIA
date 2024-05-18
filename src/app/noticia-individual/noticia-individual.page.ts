import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonThumbnail, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonCard, IonGrid, IonText, IonImg, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { NewsApiService } from '../services/newsapi.service';
import { HeaderComponent } from '../header/header.component';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-noticia-individual',
  templateUrl: './noticia-individual.page.html',
  styleUrls: ['./noticia-individual.page.scss'],
  standalone: true,
  providers: [{provide: LOCALE_ID, useValue: 'es'}],
  imports: [IonBackButton, IonButtons, IonImg, IonThumbnail, IonText, IonGrid, IonCard, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class NoticiaIndividualPage implements OnInit {

  url: any; // Puede ser un valor nulo
  noticia: any;
  contenido: any;
  fecha:Date;
  
  constructor(private activatedRoute: ActivatedRoute, private Newsapi: NewsApiService) { }

  ngOnInit() {
    this.url = this.activatedRoute.snapshot.paramMap.get('url');

    this.Newsapi.getIndividualNew(this.url).subscribe( (respuesta) => {
      console.log(respuesta);
      this.noticia = respuesta;

      this.contenido = this.noticia.text.replace(/(\.[^\.]*\.)/g, '$1<br><br>');

      //console.log('Este es el texto ya corregido: ' ,this.contenido);
      //console.log('Este es el texto de la noticia: ', this.noticia.text);


      // Convertir fecha al formato español: DD-MM-AAAA - HH-MM
      this.fecha = this.noticia.publish_date;
    })

  }

}
