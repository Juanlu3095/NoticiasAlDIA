import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonCheckbox, IonImg, IonText } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonCheckbox, IonLabel, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(private firebase: FirebaseService) { }

  ngOnInit() {
    console.log('Este es el usuario: ', this.loginForm.value.usuario)
    console.log('Ésta es la contraseña: ', this.loginForm.value.contrasena)
    this.firebase.comprobarUsuario();
  }

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.compose([Validators.email, Validators.required])), // Damos valor inicial a usuario
    contrasena: new FormControl('', Validators.required), // Damos valor inicial a contrasena
  });

  login() {
    console.log(this.loginForm)
    console.log('Este es el usuario: ', this.loginForm.value.usuario)
    console.log('Ésta es la contraseña: ', this.loginForm.value.contrasena)

    let usuario = this.loginForm.value.usuario;
    let contrasena = this.loginForm.value.contrasena;

    if(usuario) {
      let nombre = usuario.split('@'); // Obtenemos el nombre de usuario a partir del email
      console.log(nombre[0]);
    }
    // Comprueba que se haya enviado el formulario (aunque esté vacío)
    if(this.loginForm){
      this.firebase.login(usuario, contrasena);
    }
    
  }

  cerrarsesion() {
    this.firebase.logout();
  }
}
