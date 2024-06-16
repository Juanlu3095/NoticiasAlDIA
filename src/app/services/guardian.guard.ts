import { inject } from '@angular/core';
import { CanMatchFn, CanActivateFn, Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

// Con CanMatch, si el usuario no está logueado, se redirige a la página por defecto (la de la ruta '**')
export const guardianGuard: CanActivateFn = async (route, state) => {
  const authguard = inject(FirebaseService).comprobarUsuario();
  const router = inject(Router);
  
  if(await authguard) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

// Función inversa para cuando se acceda al login aunque ya estemos logueados
export const guardianInverseGuard: CanActivateFn = async (route, state) => {
  const authguard = inject(FirebaseService).comprobarUsuario();
  const router = inject(Router);
  
  if(await authguard) {
    router.navigateByUrl('/');
    return false;
  } else {
    return true;
  }
};