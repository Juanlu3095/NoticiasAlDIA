import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs';
import { text } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class EltiempoapiService {

  constructor(private http: HttpClient) { }

  // Obtiene mapa de isobaras en formato blob con la apikey de la base de datos
  getisobarasconapi(apikey:string){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/mapasygraficos/analisis', {
      params: {
        'api_key': apikey
      }
    }).pipe(
      switchMap( (response) => { // Switch map transforma valores de un observable en otro observable y los fusiona en uno solo, por tanto devuelve la última llamada HTTP
        const url = response['datos'];
        return this.http.get(url, { responseType: 'blob' }); // Los datos que se devuelven son en formato binario y para obtener la img hay que usar blob para guardarlo en memoria
      })
    )
  }

  // Predicción nacional para hoy en texto con la apikey de la base de datos
  getPrediccionNacionalHoyconapi(apikey: string){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/prediccion/nacional/hoy', {
      params: {
        'api_key': apikey
      },
    }).pipe(
      switchMap(response => {
        const datosUrl = response.datos;
        return this.http.get(datosUrl, {responseType: 'text'}); // En este caso se obtiene un texto plano, por ello hay que indicar el tipo de respuesta para que no haya error.
      })
    );
  }

  // Devuelve Tº, humedad, precipitaciones probabilidad, tiempo en texto. El código de municipio viene en getMunicipios utilzando los datos de la base de datos
  getPrediccionMunicipioconapi(apikey:string, codmunicipio:number){
    return this.http.get<any>(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/${codmunicipio}`, {
      params: {
        'api_key': apikey,
      },
    }).pipe(
      switchMap( (response) => { // Switch map transforma valores de un observable en otro observable y los fusiona en uno solo, por tanto devuelve la última llamada HTTP
        const url = response.datos;
        return this.http.get(url); // Los datos que se devuelven son en formato binario y para obtener la img hay que usar blob para guardarlo en memoria
      })
    )
  }

}
