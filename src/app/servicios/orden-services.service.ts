//se conecta a la API por los puertos get, post, put, delete
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenServicesService {
  //ruta de la API a consultar
  API_URL = 'http://localhost/Apipedidos/orderscustomers.php';
  constructor(private http: HttpClient) {}
  //llamar la API para traer los n registros
  getOrdersByCustomer(id: number): Observable<any> {
    return this.http
      .get(`${this.API_URL}?id=${id}`)
      .pipe(catchError(this.handleError));
  }

  // Para los errores
  private handleError(error: any) {
    console.error('Error:', error);
    return throwError(() => error);
  }
}
