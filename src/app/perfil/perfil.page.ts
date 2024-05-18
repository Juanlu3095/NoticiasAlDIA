import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonToast, ToastController, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonGrid, IonRow, IonCol, IonIcon, IonList, IonItemGroup, IonItemDivider, IonLabel, IonItem, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { arrowBackSharp, personCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonToast, IonButton, IonBackButton, IonButtons, IonItem, IonLabel, IonItemDivider, IonItemGroup, IonList, IonIcon, IonCol, IonRow, IonGrid, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class PerfilPage implements OnInit {

  constructor( private toastController: ToastController) {
    addIcons({ arrowBackSharp, personCircleOutline });
    
   }

  ngOnInit() {
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
