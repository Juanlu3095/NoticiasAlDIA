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
    console.log('Este es el usuario: ', this.loginForm.value.usuario)
    console.log('Ésta es la contraseña: ', this.loginForm.value.contrasena)
  }

  loginForm = new FormGroup({
    usuario: new FormControl(''), // Damos valor inicial a usuario
    contrasena: new FormControl(''),
  });

  login() {
    console.log(this.loginForm)
    console.log('Este es el usuario: ', this.loginForm.value.usuario)
    console.log('Ésta es la contraseña: ', this.loginForm.value.contrasena)

    let usuario = this.loginForm.value.usuario;
    let contrasena = this.loginForm.value.contrasena;

    if(!this.loginForm){
      this.firebase.login(usuario, contrasena);
    }
    
  }
}
