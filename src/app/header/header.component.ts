import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonMenuToggle, IonButtons, IonTitle, IonIcon, IonMenuButton } from "@ionic/angular/standalone";
import { Platform } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonMenuToggle, IonIcon, IonTitle, IonButtons, IonToolbar, IonMenuButton]
})
export class HeaderComponent  implements OnInit {

  log: boolean = true; // Cambiar esto por token de localStorage y comprobar si es necesario aplicarlo al menucontroller para que se vea el menú en el resto de páginas
  isAndroid: boolean;
  constructor(private platform: Platform, private firebase: FirebaseService) {}

  ngOnInit() {
    this.isAndroid = this.platform.is('android');
  }

}
