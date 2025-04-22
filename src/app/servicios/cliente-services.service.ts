//se conecta a la API por los puertos get, post, put, delete 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteServicesService {
//ruta de la API a consultar
API_URL='http://172.16.8.200/Apipedidos/customers.php'
  constructor(private http:HttpClient) { }
  //llamar la API para traer los n registros
  getAll(){
    return this.http.get(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  // Para los errores
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(() => error);
  }
}
