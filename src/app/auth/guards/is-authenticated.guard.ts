import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AuthStatus } from "../interfaces";

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  router.navigateByUrl('/auth/login').then(res => {
    if (res) {
      console.log('guard: isAuthenticated')
    }
  });
  return false;
};
