import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firebase: FirebaseService) { }

  private db = this.firebase.db;

  // Obtenemos el usuario pasando como parámetro la uid. Devuelve una promesa con un objecto tipo Usuario que puede estar vacío (null) si la uid no es correcta
  async getUsuario(uid:string): Promise<Usuario | null> {
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

  // Creación de un nuevo usuario al validar los datos del registro
  async newUsuario(uid:string, nombre:string, email:string, ccaa:string, localidad:string, municipioeltiempo:number, apinoticias:string, apieltiempo:string){
    const queryNewUser = doc(this.db, "Usuarios", uid);

    await setDoc(queryNewUser, {
      nombre: nombre,
      email: email,
      ccaa: ccaa,
      localidad: localidad,
      municipioeltiempo: municipioeltiempo,
      apinoticias: apinoticias,
      apieltiempo: apieltiempo
    })
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

  // Obtenemos todas las apikeys de noticias
  async getApikeysNoticias(){
    const apikeyNoticiasCollection = collection(this.db, 'Apikeynoticias');
    const query = await getDocs(apikeyNoticiasCollection);
    return query.docs.map(doc => doc.data());
  }
}
