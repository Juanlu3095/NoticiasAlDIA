import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  // Iniciamos Firebase
  public app = initializeApp(environment.firebaseConfig); // Obtenemos la configuración de environment
  public analytics = getAnalytics(this.app);
  public db = getFirestore(this.app);
  public auth = getAuth(this.app);

  public authorization = getAuth();

  login(email: any, password: any) {
    
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Este es el usuario Firebase: ', user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ', errorCode);
      console.log('Mensaje de error: ', errorMessage);
    });
  }

  logout(){
    const auth = getAuth();
    auth.signOut();
  }

}
