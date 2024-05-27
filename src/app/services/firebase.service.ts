import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  logueado: boolean;

  constructor(private router: Router, private toastController: ToastController) { }

  // Iniciamos Firebase
  public app = initializeApp(environment.firebaseConfig); // Obtenemos la configuración de environment
  public analytics = getAnalytics(this.app);
  public db = getFirestore(this.app);
  public auth = getAuth(this.app); // Permite acceder a una firebase concreta

  // Funcion para iniciar sesión
  login(email: any, password: any) {

    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Si las credenciales son correctas: 
      const user = userCredential.user;
      console.log('Este es el usuario Firebase: ', user);
      //this.router.navigate(['/']);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ', errorCode);
      console.log('Mensaje de error: ', errorMessage);
      this.presentToast("bottom", 'Error: email y/o contraseña no válidos.', 'danger');
    });
  }

  logout(){
    signOut(this.auth).then( () => {
      console.log('Se ha cerrado la sesion');
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
  EmailResetPassword(email: string){
    sendPasswordResetEmail(this.auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
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
