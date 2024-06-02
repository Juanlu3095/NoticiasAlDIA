import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonRow, IonGrid } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent],
  
})

export class HomePage implements OnInit {

  nombreUsuario: string;
  constructor(private firebase: FirebaseService, private firestore: FirestoreService) { }

  ngOnInit() { // Obtenemos el nombre de usuario desde firestore usando la uid de firebase
    this.firebase.comprobarUsuario().then( respuesta => {
      if(respuesta) {
        this.firestore.getUsuario(respuesta).then( res => {
          if(res) {
            this.nombreUsuario = res.nombre;
          }
        })
      }
    })
  }

}
