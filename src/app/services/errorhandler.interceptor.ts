import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

export const errorhandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError( (error: HttpErrorResponse) => {
    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`; // ERROR DEL CLIENTE
    } else{ // ERRORES DEL SERVIDOR
      if(error.status === 402) {
        errorMessage = `Su petición no se puede procesar porque ha excedido el límite de uso diario para su cuenta.`; 
      } else if(error.status === 429) {
        errorMessage = `Lo sentimos. En este momento hay un volumen de tráfico muy alto y no podemos procesar todas las peticiones. Inténtelo de nuevo más tarde.`;
      } else if(error.status === 401) {
        errorMessage = `Su petición no puede procesarse porque no dispone de credenciales válidas.`;
      } else if(error.status === 404) {
        errorMessage = `Lo sentimos. El recurso al que intenta acceder no está disponible.`
      } else{ // error.status === 0 -> Es un error genérico
        errorMessage = `Error: ${error.error.message}`; 
      }
       
    }

    return throwError( () => errorMessage);
  }));
};

export const errorAemetHandlerInterceptor: HttpInterceptorFn = (req, next) => { 
  return next(req).pipe(
    map((res: any) => {
      
      if (req.url.includes('https://opendata.aemet.es/opendata')) { // Nos aseguramos de que sólo analice los errores cuando hacemos peticiones a la api de AEMET
        console.log('esta es la respuesta desde el handler: ', res);
      if(res.estado && res.estado !== 200) { // Comprobamos que la respuesta no sea correcta
        let errorMessage = "";
        console.log('hola');
        switch(res.estado) {
          case 401:
            errorMessage = "Su petición no puede procesarse porque no dispone de credenciales válidas.";
            break;

          case 404:
            errorMessage = "Lo sentimos. El recurso al que intenta acceder no está disponible.";
            break;
          
          case 429:
            errorMessage = "Lo sentimos. En este momento hay un volumen de tráfico muy alto y no podemos procesar todas las peticiones. Inténtelo de nuevo más tarde.";
            break;

          default:
            errorMessage = "Hola que tal";
        }
        throw new Error(errorMessage);
      } else {
        return res;
      } 
    }
    })
  )
}
