import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getUserRole(): string{
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('payload',payload);
      return payload.roles;
    }
    return '';
  }

  isAdmin(): boolean {
    const roles: string = this.getUserRole();

    if (!roles) {
      return false;
    }
    return roles.includes('admin');
  }
}
