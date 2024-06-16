import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, MenuController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { documentTextSharp, documentTextOutline, personSharp, personOutline, homeSharp, homeOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { HeaderComponent } from './header/header.component';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  public appPages = [
    { title: 'Portada', url: '', icon: 'home' },
    { title: 'Perfil', url: '/perfil', icon: 'person' },
    { title: 'Condiciones de uso', url: '/condiciones', icon: 'document-text' },
  ];

  public categorias = [
    { title: 'Nacional', url: '/noticias-nacional', icon: 'bookmark' },
    { title: 'Autonómica', url: '/noticias-autonomica', icon: 'bookmark' },
    { title: 'Local', url: '/noticias-local', icon: 'bookmark' },
    { title: 'Internacional', url: '/noticias-internacional', icon: 'bookmark' },
    { title: 'El tiempo', url: '/eltiempo', icon: 'bookmark' },
    { title: 'Deportes', url: '/noticiasporcategoria/deporte', icon: 'bookmark' },
    { title: 'Ciencia', url: '/noticiasporcategoria/ciencia', icon: 'bookmark' },
    { title: 'Tecnología', url: '/noticiasporcategoria/tecnologia', icon: 'bookmark' },
    { title: 'Arte', url: '/noticiasporcategoria/arte', icon: 'bookmark' },
    { title: 'Música', url: '/noticiasporcategoria/musica', icon: 'bookmark' },
    { title: 'Política', url: '/noticiasporcategoria/politica', icon: 'bookmark' },
    { title: 'Economía', url: '/noticiasporcategoria/economia', icon: 'bookmark' },
  ]
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private menucontroller: MenuController, private firebase: FirebaseService) {
    addIcons({ documentTextSharp, documentTextOutline, personSharp, personOutline, homeSharp, homeOutline, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  // Comprueba si hay usuario logueado en la aplicación y activa el menú según el caso.
  public logIn = this.firebase.comprobarUsuario();
  
  async ngOnInit() {
    if(await this.logIn) {
      
      this.menucontroller.enable(true, 'main-content');
    } else {
      
      this.menucontroller.enable(false, 'main-content');
    }
  }
  
}
