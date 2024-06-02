import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonLabel, IonCheckbox, IonImg, IonText, MenuController } from '@ionic/angular/standalone';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonCheckbox, IonLabel, IonButton, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginPage implements OnInit {

  idUser: string;
  user: Usuario;

  constructor(private firebase: FirebaseService, private firestore: FirestoreService, private menucontroller: MenuController) {
    
  }

  ngOnInit() {
    console.log('Este es el usuario: ', this.loginForm.value.email)
    console.log('Ésta es la contraseña: ', this.loginForm.value.contrasena)
    this.firebase.comprobarUsuario().then( res => {
      console.log(res);
      
      if(res !== null) {
        this.idUser = res;
        this.firestore.getUsuario(this.idUser).then( respuesta => {
          if (respuesta) {
            this.user = respuesta;
            console.log(this.user);
            this.menucontroller.enable(true, 'main-content');
          }
        })
      } else {
        console.log('No hay usuario');
        this.menucontroller.enable(false, 'main-content');
      }
    });
    
  }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.email, Validators.required])), // Damos valor inicial a usuario
    contrasena: new FormControl('', Validators.required), // Damos valor inicial a contrasena
    consentimiento: new FormControl(false, Validators.requiredTrue) // Para los checkbox es necesario que estén señalados
  });

  login() {
    console.log(this.loginForm)
    console.log('Este es el usuario: ', this.loginForm.value.email)
    console.log('Ésta es la contraseña: ', this.loginForm.value.contrasena)

    let usuario = this.loginForm.value.email;
    let contrasena = this.loginForm.value.contrasena;

    if(usuario) {
      let nombre = usuario.split('@'); // Obtenemos el nombre de usuario a partir del email
      console.log(nombre[0]);
    }
    // Comprueba que se haya enviado el formulario (aunque esté vacío)
    if(this.loginForm.valid){
      this.firebase.login(usuario, contrasena);
      
    }
    
  }

  cerrarsesion() {
    this.firebase.logout();
  }
}
