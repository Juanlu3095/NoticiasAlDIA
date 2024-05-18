import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonToolbar, IonMenuToggle, IonButtons, IonTitle, IonIcon, IonMenuButton } from "@ionic/angular/standalone";
import { Platform } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonMenuToggle, IonIcon, IonTitle, IonButtons, IonToolbar, IonMenuButton]
})
export class HeaderComponent  implements OnInit {

  isAndroid: boolean;
  constructor(private platform: Platform) { }

  ngOnInit() {
    this.isAndroid = this.platform.is('android');
  }

}
