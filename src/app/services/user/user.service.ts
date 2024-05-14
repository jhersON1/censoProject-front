import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from "@environments/environments";
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly #apiUrl: string = environment.apiUrl;
  readonly #token: string | null= localStorage.getItem('token');

  #http: HttpClient = inject( HttpClient );

  // Método para obtener la lista de usuarios
  getUserList(): Observable<any> {
    const adminId: string | null = this.getUserIdFromToken();
    if (!adminId) {
      console.error('Admin id no found');
      return of(null);
    }

    const url = `${this.#apiUrl}/auth/admin/${adminId}/users`;

    return this.#http.get<any>(url);
  }

  deleteUser(id: string): Observable<any> {
    const url = `${this.#apiUrl}/auth/user/${id}`;
    return this.#http.delete<any>(url);
  }

  // Método para decodificar el token y extraer el ID del payload
  private getUserIdFromToken(): string | null {
    if (this.#token) {
      try {
        const decoded: any = jwtDecode(this.#token);
        return decoded.id;

      } catch (error) {
        console.error('Error decodificando el token', error);
        return null;
      }
    }
    return null;
  }
}
