import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { AuthStatus } from "../../auth/interfaces";
import { RolesService } from "../../services/roles/roles.service";

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
  styleUrl: './nabbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NabbarComponent implements OnInit {
  #router = inject(Router)
  #authService = inject(AuthService);
  #rolesService = inject(RolesService);

  isNotAuthenticated: boolean = this.#authService.authStatus() === AuthStatus.notAuthenticated;
  isAuthenticated: boolean = this.#authService.authStatus() === AuthStatus.authenticated;
  isAdmin: boolean = false;

  ngOnInit (): void {
    if (this.isAuthenticated) {
      this.isAdmin = this.#rolesService.isAdmin();
    }
  }

  // TODO: apply SOLID

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

  logout() {
    this.#authService.logout();
    window.location.reload();
  }

}
