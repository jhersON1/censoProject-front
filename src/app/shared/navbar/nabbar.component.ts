import { Component, inject } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { AuthStatus } from "../../auth/interfaces";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton
  ],
  templateUrl: './nabbar.component.html',
  styleUrl: './nabbar.component.scss'
})
export class NabbarComponent {
  #router = inject(Router)
  #authService = inject(AuthService);
  isNotAuthenticated: boolean = this.#authService.authStatus() === AuthStatus.notAuthenticated;
  isAuthenticated: boolean = this.#authService.authStatus() === AuthStatus.authenticated;

  goLogin() {
    this.#router.navigate(['/auth/login']).then( success => {
      if ( !success ) {
        console.error( "No found navigate, navbar login" )
      }
    });
  }

  goHomePage() {
    this.#router.navigate(['/homepage']).then( success => {
      if ( !success ) {
        console.error( "No found navigate, navbar homepage" )
      }
    });
  }

  goUserManagement() {
    this.#router.navigate(['/users']).then( success => {
      if ( !success ) {
        console.error( "No found navigate, navbar UserManagement" )
      }
    });
  }

  goCreateForm() {
    this.#router.navigate(['/create-form']).then( success => {
      if ( !success ) {
        console.error( "No found navigate, navbar CreateForm" )
      }
    });
  }

  goShowFormsAdmins() {
    this.#router.navigate(['/homepage']).then( success => {
      if ( !success ) {
        console.error( "No found navigate, navbar ShowFormsAdmins" )
      }
    });
  }

  goShowFormsUsers() {
    this.#router.navigate(['/users']).then( success => {
      if ( !success ) {
        console.error( "No found navigate, navbar ShowFormsUsers" )
      }
    });
  }

  logout() {
    this.#authService.logout();
    window.location.reload();
  }
}
