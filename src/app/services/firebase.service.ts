import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private router: Router) { }

  // Iniciamos Firebase
  public app = initializeApp(environment.firebaseConfig); // Obtenemos la configuración de environment
  public analytics = getAnalytics(this.app);
  public db = getFirestore(this.app);
  public auth = getAuth(this.app); // Permite acceder a una firebase concreta

  login(email: any, password: any) {

    signInWithEmailAndPassword(this.auth, email, password)
    .then((userCredential) => {
      // Si las credenciales son correctas: 
      const user = userCredential.user;
      console.log('Este es el usuario Firebase: ', user);
      this.router.navigate(['/']);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ', errorCode);
      console.log('Mensaje de error: ', errorMessage);
    });
  }

  logout(){
    signOut(this.auth).then( () => {
      console.log('Se ha cerrado la sesion');
    });
    
  }

  // Es una función que observa el estado del usuario.
  comprobarUsuario() {

    onAuthStateChanged(this.auth, (user) => {

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('Este es el usuario: ', user)
        
      } else {
        // User is signed out
        console.log('El usuario se ha desconectado.')
      }
    });

  }

}
