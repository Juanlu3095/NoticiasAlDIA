import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonGrid } from '@ionic/angular/standalone';
import { NewsApiService } from '../services/newsapi.service';
import { Platform } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent],
  
})

export class HomePage implements OnInit {

  imagenUrl: string;
  isAndroid: boolean;
  constructor(private newsapiservice: NewsApiService, private platform: Platform) { }

  ngOnInit() {
    
    //this.isAndroid = this.platform.is('android');
    /* this.newsapiservice.getNews().subscribe( respuesta => {
      console.log(respuesta);
    }) */

    /* this.newsapiservice.getTiempo().subscribe ( res => {
      console.log(res)
    })

    this.newsapiservice.getTiempoProvincia().subscribe( resp => {
      console.log(resp)
    }) */

    // Obtener observable con el blob de la imagen
    /* this.newsapiservice.getinfoplaya().subscribe( respuestaPlaya => {
      this.imagenUrl = URL.createObjectURL(respuestaPlaya);
      console.log(this.imagenUrl)
    }) */
  }

}
