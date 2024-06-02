import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./perfil/perfil.page').then( m => m.PerfilPage)
  },
  {
    path: 'condiciones',
    loadComponent: () => import('./condiciones/condiciones.page').then( m => m.CondicionesPage)
  },
  {
    path: 'noticia-individual/:url',
    loadComponent: () => import('./noticia-individual/noticia-individual.page').then( m => m.NoticiaIndividualPage)
  },
  {
    path: 'noticias-local',
    loadComponent: () => import('./noticias-local/noticias-local.page').then( m => m.NoticiasLocalPage)
  },
  {
    path: 'noticias-nacional',
    loadComponent: () => import('./noticias-nacional/noticias-nacional.page').then( m => m.NoticiasNacionalPage)
  },
  {
    path: 'noticias-autonomica',
    loadComponent: () => import('./noticias-autonomica/noticias-autonomica.page').then( m => m.NoticiasAutonomicaPage)
  },
  {
    path: 'noticias-internacional',
    loadComponent: () => import('./noticias-internacional/noticias-internacional.page').then( m => m.NoticiasInternacionalPage)
  },
  {
    path: 'noticiasporcategoria/:keyword',
    loadComponent: () => import('./noticias-categoria/noticias-categoria.page').then( m => m.NoticiasCategoriaPage)
  },
  {
    path: 'eltiempo',
    loadComponent: () => import('./eltiempo/eltiempo.page').then( m => m.EltiempoPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: '**',
    loadComponent: () => import('./pagenotfound/pagenotfound.page').then( m => m.PagenotfoundPage)
  },

  
];
