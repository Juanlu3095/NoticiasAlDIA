import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonText, IonImg, IonButton, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.page.html',
  styleUrls: ['./cambiarcontrasena.page.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonButton, IonImg, IonText, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CambiarcontrasenaPage implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  cambiarcontrasenaForm = new FormGroup({
    email:new FormControl('', Validators.compose([Validators.required, Validators.email]))
  })

  cambiarcontrasena(){
    let email = this.cambiarcontrasenaForm.value.email ?? '';

    this.firebase.cambiarcontrasena(email);
  }
}
