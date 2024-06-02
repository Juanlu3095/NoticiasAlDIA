import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { doc, getDoc, setDoc } from "firebase/firestore";
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

  // Añadir o modificar usuario para luego actualizar en el HTML
  async setUsuario(uid:string, newapinoticias:string, newccaa:string, newlocalidad:string, newapieltiempo:string, newmunicipioeltiempo:number) {
    const querySet = doc(this.db, "Usuarios", uid);

    await setDoc(querySet, {
      apinoticias: newapinoticias || '',
      ccaa: newccaa || '',
      localidad: newlocalidad || '',
      apieltiempo: newapieltiempo || '',
      municipioeltiempo: newmunicipioeltiempo || '',
    }, 
    { merge: true }
    )

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
