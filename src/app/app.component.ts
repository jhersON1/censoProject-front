import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CensoFormComponent } from "./pages/censo-form/censo-form.component";
import { GenerateCensoFormComponent } from "./generate-censo-form/generate-censo-form.component";
import { AuthService } from "./auth/services/auth.service";
import { AuthStatus } from "./auth/interfaces";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #authService = inject( AuthService );
  #router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    if ( this.#authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {
    switch( this.#authService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        if (this.#authService.currentUser()?.newUser) {
          this.#router.navigateByUrl('/homepage').then( finished => {
            if (!finished) {
              console.error('navigation in app component dont work, authenticated')
            }
          });
        }else {
          this.#router.navigateByUrl('/homepage')
        }
        return;

      case AuthStatus.notAuthenticated:
        this.#router.navigateByUrl('/homepage').then( finished => {
          if (!finished) {
            console.error('navigation in app component dont work, not authenticated')
          }
        });
        return;
    }
  });
}
