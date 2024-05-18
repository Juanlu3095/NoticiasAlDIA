import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonGrid, IonRow } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.page.html',
  styleUrls: ['./condiciones.page.scss'],
  standalone: true,
  imports: [IonRow, IonGrid, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent]
})
export class CondicionesPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
