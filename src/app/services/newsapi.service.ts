import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

const apikey = environment.apikeynews;

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  endpoint = 'https://api.worldnewsapi.com/search-news?language=es';
  endpointIndividualNew = 'https://api.worldnewsapi.com/extract-news?';

  constructor(private http: HttpClient) { }

  // Obtenemos la noticia concreta por medio de la url (La API no permite usar la id para pasarla por parámetro)
  getIndividualNew(url:string) {

    return this.http.get(this.endpointIndividualNew, {
      params: {
        'api-key': apikey,
        'url': url,
        'analyze': false // Extrae entidades si es true
      }
    })
  }

  // Obtenemos noticias por el lugar donde ocurre
  getNewsByPlace(entity: string) {
    return this.http.get(this.endpoint, {
      params: {
        'api-key': apikey,
        //'text': 'malaga', // Palabra clave
        //'earliest-publish-date': '2024-05-01', // Fecha más antigua de publicación
        'sort': 'publish-time', // Ordenar por fecha de publicación
        'sort-direction': 'DESC', // Ordenar por orden descendiente: De más moderno a más antiguo
        'source-countries': 'es', // País del diario que redacta la noticia
        'number': '20', // Número máximo de noticias
        'entities': `LOC:${entity}` // Entidad, puede ser lugar, persona u organización
      }
    }).pipe(
      map((res:any) => { /* Mapear nos permite acceder directamente al data dentro del json para no tener que poner siempre data.loquesea */
        return res.news;
      })
    )
  } 

  // Obtenemos noticias por el lugar donde ocurre utilizando la apikey de la base de datos
  getNewsByPlaceConApi(entity: string, apikeynoticias: string) {
    return this.http.get(this.endpoint, {
      params: {
        'api-key': apikeynoticias,
        //'text': 'malaga', // Palabra clave
        //'earliest-publish-date': '2024-05-01', // Fecha más antigua de publicación
        'sort': 'publish-time', // Ordenar por fecha de publicación
        'sort-direction': 'DESC', // Ordenar por orden descendiente: De más moderno a más antiguo
        'source-countries': 'es', // País del diario que redacta la noticia
        'number': '20', // Número máximo de noticias
        'entities': `LOC:${entity}` // Entidad, puede ser lugar, persona u organización
      }
    }).pipe(
      map((res:any) => { /* Mapear nos permite acceder directamente al data dentro del json para no tener que poner siempre data.loquesea */
        return res.news;
      })
    )
  }

  // Obtenemos noticias por palabra clave
  getNewsByKeyword(keyword: string) {
    return this.http.get(this.endpoint, {
      params: {
        'api-key': apikey,
        'text': keyword, // Palabra clave
        'earliest-publish-date': '2024-05-01', // Fecha más antigua de publicación
        'sort': 'publish-time', // Ordenar por fecha de publicación
        'sort-direction': 'DESC', // Ordenar por orden descendiente: De más moderno a más antiguo
        'source-countries': 'es', // País del diario que redacta la noticia
        'number': '20', // Número máximo de noticias
      }
    }).pipe(
      map((res:any) => { /* Mapear nos permite acceder directamente al data dentro del json para no tener que poner siempre data.loquesea */
        return res.news;
      })
    )
  }
  
  // Obtenemos noticias por palabra clave utilizando la apikey de la base de datos
  getNewsByKeywordConApi(keyword: string, apikeynoticias: string) {
    return this.http.get(this.endpoint, {
      params: {
        'api-key': apikeynoticias,
        'text': keyword, // Palabra clave
        'earliest-publish-date': '2024-05-01', // Fecha más antigua de publicación
        'sort': 'publish-time', // Ordenar por fecha de publicación
        'sort-direction': 'DESC', // Ordenar por orden descendiente: De más moderno a más antiguo
        'source-countries': 'es', // País del diario que redacta la noticia
        'number': '20', // Número máximo de noticias
      }
    }).pipe(
      map((res:any) => { /* Mapear nos permite acceder directamente al data dentro del json para no tener que poner siempre data.loquesea */
        return res.news;
      })
    )
  }
}
