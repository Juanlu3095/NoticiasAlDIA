import { Routes } from '@angular/router';
import { guardianGuard, guardianInverseGuard } from './services/guardian.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate: [guardianGuard]
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'condiciones',
    loadComponent: () => import('./condiciones/condiciones.page').then( m => m.CondicionesPage)
  },
  {
    path: 'noticia-individual/:url',
    loadComponent: () => import('./noticia-individual/noticia-individual.page').then( m => m.NoticiaIndividualPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'noticias-local',
    loadComponent: () => import('./noticias-local/noticias-local.page').then( m => m.NoticiasLocalPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'noticias-nacional',
    loadComponent: () => import('./noticias-nacional/noticias-nacional.page').then( m => m.NoticiasNacionalPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'noticias-autonomica',
    loadComponent: () => import('./noticias-autonomica/noticias-autonomica.page').then( m => m.NoticiasAutonomicaPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'noticias-internacional',
    loadComponent: () => import('./noticias-internacional/noticias-internacional.page').then( m => m.NoticiasInternacionalPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'noticiasporcategoria/:keyword',
    loadComponent: () => import('./noticias-categoria/noticias-categoria.page').then( m => m.NoticiasCategoriaPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'eltiempo',
    loadComponent: () => import('./eltiempo/eltiempo.page').then( m => m.EltiempoPage),
    canActivate: [guardianGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage),
    canActivate: [guardianInverseGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage),
    canActivate: [guardianInverseGuard]
  },
  {
    path: 'cambiarcontrasena',
    loadComponent: () => import('./cambiarcontrasena/cambiarcontrasena.page').then( m => m.CambiarcontrasenaPage),
    canActivate: [guardianInverseGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./pagenotfound/pagenotfound.page').then( m => m.PagenotfoundPage)
  },

  
];
