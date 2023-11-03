import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../enviroments/environments';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  //Retorna los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  //Retorna los lenguages de la base de datos
  getLanguages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/languages`);
  }

  //retorna las areas de la base de datos
  getArea(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/areas`);
  }

  //retorna el menu
  getMenu(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/menu`);
  }

  updateData(updateData: any): Observable<any> {
    console.log(updateData);
    return this.http.post<any>(`${this.apiUrl}/updateData/`, updateData);
  }

  // Método para eliminar un registro en la base de datos
  deleteData(idArea: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/deleteData/${idArea}`);
    // En este ejemplo, se asume que en el servidor tienes una ruta '/deleteData/:id' para eliminar un registro.
  }
}
