import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { switchMap, map } from 'rxjs';
import { text } from 'ionicons/icons';

const apikeytiempo = environment.apikeyeltiempo;

@Injectable({
  providedIn: 'root'
})
export class EltiempoapiService {

  constructor(private http: HttpClient) { }

  getisobaras(){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/mapasygraficos/analisis', {
      params: {
        'api_key': apikeytiempo
      }
    }).pipe(
      switchMap( (response) => { // Switch map transforma valores de un observable en otro observable y los fusiona en uno solo, por tanto devuelve la última llamada HTTP
        const url = response['datos'];
        return this.http.get(url, { responseType: 'blob' }); // Los datos que se devuelven son en formato binario y para obtener la img hay que usar blob para guardarlo en memoria
      })
    )
  }

  // Devuelve el pdf, ver este enlace: https://stackoverflow.com/questions/50332447/how-to-get-pdf-through-api-in-angular-service
  getBalanceHidrico(año:number, decena:number){
    return this.http.get(`https://opendata.aemet.es/opendata/api/productos/climatologicos/balancehidrico/${año}/${decena}`, {
      params: {
        'api_key': apikeytiempo
      },
      responseType: text
    } as Record<any, unknown>)
  }

  // Obtenemos todos los municipios
  getMunicipios(){
    return this.http.get('https://opendata.aemet.es/opendata/api/maestro/municipios', {
      params: {
        'api_key': apikeytiempo
      },
    })
  }

  getInfoMunicipio(){
    return this.http.get('https://opendata.aemet.es/opendata/api/maestro/municipio/44004', {
      params: {
        'api_key': apikeytiempo
      },
    })
  }

  // Predicción nacional para hoy en texto
  getPrediccionNacionalHoy(){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/prediccion/nacional/hoy', {
      params: {
        'api_key': apikeytiempo
      },
    }).pipe(
      switchMap(response => {
        const datosUrl = response.datos;
        return this.http.get(datosUrl, {responseType: 'text'}); // En este caso se obtiene un texto plano, por ello hay que indicar el tipo de respuesta para que no haya error.
      })
    );
  }

  // Predicción nacional para mañana en texto
  getPrediccionNacionalManana(){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/prediccion/nacional/manana', {
      params: {
        'api_key': apikeytiempo
      },
    }).pipe(
      switchMap(response => {
        const datosUrl = response.datos;
        return this.http.get(datosUrl, {responseType: 'text'}); // En este caso se obtiene un texto plano, por ello hay que indicar el tipo de respuesta para que no haya error.
      })
    );
  }

  getinfocosta(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/maritima/costera/costa/42', {
      params: {
        'api_key': apikeytiempo
      },
    })
  }

  getClimatologia(){
    return this.http.get('https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2024-05-18/fechafin/2024-05-19/todasestaciones', {
      params: {
        'api_key': apikeytiempo
      },
    })
  }

  // Devuelve Tº, humedad, precipitaciones probabilidad, tiempo en texto. El código de municipio viene en getMunicipios
  getPrediccionMunicipio(){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/29067', {
      params: {
        'api_key': apikeytiempo
      },
    }).pipe(
      switchMap( (response) => { // Switch map transforma valores de un observable en otro observable y los fusiona en uno solo, por tanto devuelve la última llamada HTTP
        const url = response.datos;
        return this.http.get(url); // Los datos que se devuelven son en formato binario y para obtener la img hay que usar blob para guardarlo en memoria
      })
    )
  }

  // Devuelve el tiempo de hoy por provincia en texto
  getPrediccionProvinciaHoy(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/provincia/hoy/29', {
      params: {
        'api_key': apikeytiempo
      },
    })
  }

}
