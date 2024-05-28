import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { doc, getDoc } from "firebase/firestore";
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firebase: FirebaseService) { }

  private db = this.firebase.db;

  // Obtenemos el usuario pasando como parámetro la uid
  async getUsuario(uid:string) {
    const queryUser = doc(this.db, "Usuarios", uid);

    const resultado = (await (getDoc(queryUser))).data();

    if(resultado) {
      const usuario:Usuario =  {
        id: uid,
        nombre: resultado['nombre'] || '', // Se usa || '' para que devuelva el dato vacío y no undefined
        email: resultado['email'] || '',
        apinoticias: resultado['apinoticias'] || '',
        ccaa: resultado['ccaa'] || '',
        localidad: resultado['localidad'] || '',
        apieltiempo: resultado['apieltiempo'] || '',
        municipioeltiempo: resultado['municipioeltiempo'] || '',
      }
      return usuario;
    } else {
      return null;
    }
    
  }
}
