import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../enviroments/environments';
import { userName } from '../interface/username';
import { users } from '../interface/users';

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

  //Editar o actualizar AREA
  updateData(updateData: any): Observable<any> {
    console.log(updateData);
    return this.http.post<any>(`${this.apiUrl}/updateData/`, updateData);
  }

  //Editar o actualizar Languagues
  updateDataLanguage(updateDataLanguage: any): Observable<any> {
    console.log(updateDataLanguage);
    return this.http.post<any>(
      `${this.apiUrl}/updateDataLanguage/`,
      updateDataLanguage
    );
  }

  //Editar o actualizar Menu
  updateDataMenu(updateDataMenu: any): Observable<any> {
    console.log(updateDataMenu);
    return this.http.post<any>(
      `${this.apiUrl}/updateDataMenu/`,
      updateDataMenu
    );
  }

  //Editar o actualizar Users
  updateDataUser(updateDataUser: any): Observable<any> {
    console.log(updateDataUser);
    return this.http.post<any>(
      `${this.apiUrl}/updateDataUser/`,
      updateDataUser
    );
  }

  // Método para eliminar un registro en la base de datos MENU
  deleteDataMenu(idMenu: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/deleteDataMenu/${idMenu}`);
  }

  // Método para eliminar un registro en la base de datos AREA
  deleteData(idArea: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/deleteData/${idArea}`);
  }

  // Método para eliminar un registro en la base de datos Language
  deleteDataLanguage(idLanguage: number): Observable<any> {
    return this.http.delete<void>(
      `${this.apiUrl}/deleteDataLanguage/${idLanguage}`
    );
  }

  // Método para eliminar un registro en la base de datos Usuarios
  deleteDataUser(idUser: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/deleteDataUser/${idUser}`);
  }

  // Agregar un nuevo producto
  addUser(userName: users): Observable<users> {
    return this.http.post<users>(`${this.apiUrl}/addUser`, userName);
  }
}
