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

  // Método para actualizar un registro en la base de datos
  updateData(updatedData: any): Observable<any> {
    if (updatedData && updatedData.id) {
      return this.http.put<any>(
        `${this.apiUrl}/updateData/${updatedData.id}`,
        updatedData
      );
    } else {
      // Manejar el caso en el que updatedData no tenga un ID válido.
      console.error('ID no válido', updatedData);
      return throwError('ID no válido');
    }
  }

  // Método para eliminar un registro en la base de datos
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteData/${id}`);
    // En este ejemplo, se asume que en el servidor tienes una ruta '/deleteData/:id' para eliminar un registro.
  }
}
