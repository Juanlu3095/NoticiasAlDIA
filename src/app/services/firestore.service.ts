import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { doc, getDoc } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firebase: FirebaseService) { }

  private db = this.firebase.db;

  async getUsuario(uid:string) {
    const queryUser = doc(this.db, "Usuarios", uid);

    const resultado = (await getDoc(queryUser)).data();

    console.log(resultado);
  }
}
