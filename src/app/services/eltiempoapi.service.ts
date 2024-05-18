import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs';
import { text } from 'ionicons/icons';

const apikeytiempo = environment.apikeyeltiempo;

@Injectable({
  providedIn: 'root'
})
export class EltiempoapiService {

  constructor(private http: HttpClient) { }

  getProvincias(){
    return this.http.get('https://www.el-tiempo.net/api/json/v2/provincias');
  }

  getTiempoProvincia(){
    return this.http.get('https://www.el-tiempo.net/api/json/v2/provincias/29');
  }

  getTiempoMunicipio(){
    return this.http.get('https://www.el-tiempo.net/api/json/v2/provincias/01/municipios/01001');
  }

  getinfouvi(){
    return this.http.get<any>(`https://opendata.aemet.es/opendata/api/prediccion/especifica/uvi/0`, { // Debemos poner <any> porque nos sale un error por el tipo de dato devuelto.
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      }
    }).pipe(
      switchMap( (response) => { // Switch map transforma valores de un observable en otro observable y los fusiona en uno solo, por tanto devuelve la última llamada HTTP
        const url = response['datos'];
        return this.http.get<any>(url);
      })
    )
  }

  getisobaras(){
    return this.http.get<any>('https://opendata.aemet.es/opendata/api/mapasygraficos/analisis', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
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
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
      responseType: text
    } as Record<any, unknown>)
  }

  // Obtenemos todos los municipios
  getMunicipios(){
    return this.http.get('https://opendata.aemet.es/opendata/api/maestro/municipios', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  getInfoMunicipio(){
    return this.http.get('https://opendata.aemet.es/opendata/api/maestro/municipio/44004', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  // Predicción nacional para hoy en texto
  getPrediccionNacionalHoy(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/nacional/hoy', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  // Predicción nacional para mañana en texto
  getPrediccionNacionalManana(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/nacional/manana', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  // Predicción nacional para pasado mañana en texto
  getPrediccionNacionalPasadomanana(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/nacional/pasadomanana', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  getinfocosta(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/maritima/costera/costa/42', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  getClimatologia(){
    return this.http.get('https://opendata.aemet.es/opendata/api/valores/climatologicos/diarios/datos/fechaini/2024-05-18/fechafin/2024-05-19/todasestaciones', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  // Devuelve Tº, humedad, precipitaciones probabilidad, tiempo en texto. El código de municipio viene en getMunicipios
  getPrediccionMunicipio(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/29067', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  getPrediccionPlaya(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/301101', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

  // Devuelve el tiempo de hoy por provincia en texto
  getPrediccionProvinciaHoy(){
    return this.http.get('https://opendata.aemet.es/opendata/api/prediccion/provincia/hoy/29', {
      params: {
        'api_key': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZGV2dG9kYXkyNUBnbWFpbC5jb20iLCJqdGkiOiI5ZDRjOGM3Mi1lMWYwLTRmZTMtOWU3ZC1kYjk4MGM4NGY3ZjUiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTcxNTI3NjAxOSwidXNlcklkIjoiOWQ0YzhjNzItZTFmMC00ZmUzLTllN2QtZGI5ODBjODRmN2Y1Iiwicm9sZSI6IiJ9.eJMFRQdWfiJceDV4yyOGmeE5BXcck12hIi28uvcBBCE'
      },
    })
  }

}
