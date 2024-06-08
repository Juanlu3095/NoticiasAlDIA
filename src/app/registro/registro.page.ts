import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonText, IonButton, IonGrid, IonRow, IonCol, IonCheckbox, IonAlert, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonAlert, IonCheckbox, IonCol, IonRow, IonGrid, IonButton, IonText, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroPage implements OnInit {

  constructor(private firebase: FirebaseService, private firestore: FirestoreService, private route: Router) { }

  ngOnInit() {
  }

  registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl<string>('', Validators.compose([Validators.email, Validators.required])), // Damos valor inicial a usuario
    contrasena: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])), // Damos valor inicial a contrasena
    ccaa: new FormControl('', Validators.required),
    localidad: new FormControl('', Validators.required),
    municipio: new FormControl<number>(0),
    apinoticias: new FormControl('', Validators.required),
    apieltiempo: new FormControl('', Validators.required),
    consentimiento: new FormControl(false, Validators.requiredTrue) // Para los checkbox es necesario que estén señalados
  });

  async login(){
    let nombre = this.registroForm.value.nombre ?? '';
    let email = this.registroForm.value.email ?? ''; // Si el valor es null o undefined, devolvemos una cadena vacía
    let contrasena = this.registroForm.value.contrasena ?? '';
    let ccaa = this.registroForm.value.ccaa ?? '';
    let localidad = this.registroForm.value.localidad ?? '';
    let municipio = this.registroForm.value.municipio ?? 0;
    let apinoticias = this.registroForm.value.apinoticias ?? '';
    let apieltiempo = this.registroForm.value.apieltiempo ?? '';

    console.log(this.registroForm);

    if(this.registroForm.valid) {
      let uidUser = await this.firebase.registro(email, contrasena);
      if(uidUser){
        await this.firestore.newUsuario(uidUser, nombre, email, ccaa, localidad, municipio, apinoticias, apieltiempo);
        this.route.navigate(['/']);
      } else {
        console.log('Error');
      }
      
    }
    
  }

  // Alerta para redirigir al SEPE donde poder ver los códigos de municipios
  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',   
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: () => {
        location.href = "https://www.sepe.es/HomeSepe/empresas/servicios-para-empresas/comunica-contratacion/obtencion-codigos/busqueda-municipios.html"
      },
    },
  ];

}
