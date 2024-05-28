import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonToast, ToastController, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonGrid, IonRow, IonCol, IonIcon, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { arrowBackSharp, personCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Usuario } from '../interfaces/usuario';
import { FirebaseService } from '../services/firebase.service';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonToast, IonButton, IonBackButton, IonButtons, IonItem, IonLabel, IonItemDivider, IonItemGroup, IonList, IonIcon, IonCol, IonRow, IonGrid, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class PerfilPage implements OnInit {

  idUser: string;
  user: Usuario = {} as Usuario; // Iniciamos user como un objeto vacío para que no haya problemas de carga

  constructor( private toastController: ToastController, private firebase: FirebaseService, private firestore: FirestoreService) {
    addIcons({ arrowBackSharp, personCircleOutline });
    
   }

  ngOnInit() {
    this.firebase.comprobarUsuario().then( res => {
      console.log(res);
      
      if(res !== null) {
        this.idUser = res;
        this.firestore.getUsuario(this.idUser).then( respuesta => {
          if (respuesta) {
            this.user = respuesta;
            console.log(this.user)
          }
        })
      } else {
        console.log('No hay usuario')
      }
    });
  }

  logout(){
    console.log('adios');
  }

  // Guardar cambios de la configuración del usuario
  async guardarcambios(){
    console.log('Cambios guardados');
    
    // Incluimos el Toast una vez los cambios se hayan realizado
    const toast = await this.toastController.create({
      message: 'Cambios guardados.',
      duration: 2000,
      position: 'bottom', 
      color: "primary"
    });

    await toast.present();
  }

}
