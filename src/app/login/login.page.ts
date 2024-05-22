import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    usuario: new FormControl(''),
    contrasena: new FormControl(''),
  });

  login() {
    
  }
}
