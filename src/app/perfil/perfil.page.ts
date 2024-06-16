import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, IonContent, IonHeader, IonToolbar, IonText, IonGrid, IonRow, IonCol, IonIcon, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonButtons, IonBackButton, IonButton, IonAlert, IonInput, IonModal } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { arrowBackSharp, personCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Usuario } from '../interfaces/usuario';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonModal, IonInput, IonAlert, IonButton, IonBackButton, IonButtons, IonItem, IonLabel, IonItemDivider, IonItemGroup, IonList, IonIcon, IonCol, IonRow, IonGrid, IonText, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class PerfilPage implements OnInit {

  idUser: string;
  user: Usuario = {} as Usuario; // Iniciamos user como un objeto vacío para que no haya problemas de carga
  ajustesFrom: FormGroup;

  constructor( private toastController: ToastController, private firebase: FirebaseService, private firestore: FirestoreService) {
    addIcons({ arrowBackSharp, personCircleOutline });
   }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( res => {
      
      if(res !== null) {
        this.idUser = res;
        this.firestore.getUsuario(this.idUser).then( respuesta => {
          if (respuesta) {
            this.user = respuesta;

            // Inyectamos los valores en el form Group del modal para indicar los valores iniciales
            this.ajustesForm.patchValue({
              newapinoticias: this.user.apinoticias,
              newapiaemet: this.user.apieltiempo,
              newccaa: this.user.ccaa,
              newlocalidad: this.user.localidad,
              newmunicipio: this.user.municipioeltiempo
            });
          }
        })
      } else {
        console.log('No hay usuario')
      }
    });

    
  }

  logout(){
    this.firebase.logout();
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

  

  // Modificar ajustes al pulsar en el botón 'Modificar ajustes'
  @ViewChild(IonModal) modal: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  ajustesForm = new FormGroup({
    newapinoticias: new FormControl(this.user.apinoticias, Validators.required),
    newapiaemet: new FormControl(this.user.apieltiempo, Validators.required),
    newccaa: new FormControl(this.user.ccaa, Validators.required),
    newlocalidad: new FormControl(this.user.localidad, Validators.required),
    newmunicipio: new FormControl(this.user.municipioeltiempo, Validators.required),
  });

  cancelar() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirmar() {

    let newapinoticias = this.ajustesForm.value.newapinoticias ?? ''; // Estos valores pueden estar vacíos si no se rellena el campo, por lo que si son null on undefined, devuelve ''
    let newapiaemet = this.ajustesForm.value.newapiaemet ?? '';
    let newccaa = this.ajustesForm.value.newccaa ?? '';
    let newlocalidad = this.ajustesForm.value.newlocalidad ?? '';
    let newmunicipio = this.ajustesForm.value.newmunicipio ?? 0;

    if(this.ajustesForm.valid) {
    this.firestore.setUsuario(this.idUser, newapinoticias, newccaa, newlocalidad, newapiaemet, newmunicipio).then( res => {
      if(res) {
        this.user = res;
      }
    })
    }
    
    // Incluimos el Toast una vez los cambios se hayan realizado
    const toast = await this.toastController.create({
      message: 'Cambios guardados.',
      duration: 2000,
      position: 'bottom', 
      color: "primary"
    });

    await toast.present();
    this.modal.dismiss(this.name, 'confirm');
  }
  
}
