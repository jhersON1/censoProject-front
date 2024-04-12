import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http: HttpClient) { }

  getUserList(): Observable<any> {
    return this._http.get('http://localhost:3000/usuarios');
  }

  deleteUser(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/usuarios/${id}`);
  }
  
}
