import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, createUserWithEmailAndPassword  } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  logueado: boolean;

  constructor(private router: Router, private toastController: ToastController, private menucontroller: MenuController) { }

  // Iniciamos Firebase
  public app = initializeApp(environment.firebaseConfig); // Obtenemos la configuración de environment
  public analytics = getAnalytics(this.app);
  public db = getFirestore(this.app);
  public auth = getAuth(this.app); // Permite acceder a una firebase concreta

  // Función para iniciar sesión
  login(email: any, password: any) {

    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Si las credenciales son correctas: 
      const user = userCredential.user;
      console.log('Este es el usuario Firebase: ', user);
      this.menucontroller.enable(true, 'main-content');
      this.router.navigate(['/']);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if( errorCode == 'auth/invalid-credential') {
        this.presentToast("bottom", 'Error: email y/o contraseña no válidos.', 'danger');
      } else if( errorCode == 'auth/network-request-failed') {
        this.presentToast("bottom", 'Error: compruebe su conexión a internet.', 'danger');
      } else {
        this.presentToast("bottom", 'Ha ocurrido un error. Por favor, contacte con soporte.', 'danger');
      }
      
    });
  }

  // Función para cerrar sesión
  logout(){
    signOut(this.auth).then( () => {
      console.log('Se ha cerrado la sesion');
      this.menucontroller.enable(false, 'main-content');
    });
    
  }

  // Función que observa el estado del usuario y obtiene el uid del usuario
  comprobarUsuario(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log('Este es el usuario desde el servicio: ', user);
          this.logueado = true;
          resolve(uid);
        } else {
          console.log('El usuario se ha desconectado.');
          this.logueado = false;
          resolve(null);
        }
      }, (error) => {
        reject(error);
      });
    });
  }
  
  // Reseteo de la contraseña por email
  cambiarcontrasena(email: string){
    sendPasswordResetEmail(this.auth, email)
  .then(() => {
    // Password reset email sent!
    this.presentToast("bottom", 'Por favor, revise su email.', 'primary');
    this.router.navigate(['/login']);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if( errorCode == 'auth/invalid-email') {
      this.presentToast("bottom", 'Error: email no válido.', 'danger');
    } else if( errorCode == 'auth/network-request-failed') {
      this.presentToast("bottom", 'Error: compruebe su conexión a internet.', 'danger');
    } else {
      this.presentToast("bottom", 'Ha ocurrido un error. Por favor, contacte con soporte.', 'danger');
    }
  });
  }

  // Función para registrar usuarios. Una vez registrado, el login se hace automáticamente
  async registro(email: string, password:string): Promise<string | null> {
    return createUserWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Signed in 
        if(userCredential){
          const uid = userCredential.user.uid;
          return uid;
        } else {
          return null;
        }
    })
    .catch((error) => {
      const errorCode = error.code; 
      const errorMessage = error.message;

      if( errorCode == 'auth/network-request-failed') {
        this.presentToast("bottom", 'Error: compruebe su conexión a internet.', 'danger');
      } else {
        this.presentToast("bottom", 'Ha ocurrido un error. Por favor, contacte con soporte.', 'danger');
      }
      return errorCode;
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: position,
      color: color,
    });

    await toast.present();
  }
}
