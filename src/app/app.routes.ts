import { Routes } from '@angular/router';
import { isAuthenticatedGuard } from "./auth/guards";
import { HomepageComponent } from "./homepage/homepage.component";

export const routes: Routes = [
  {
    path: 'auth',
    //canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.routes').then( m => m.authRoutes)
  },
  {
    path: 'homepage',
    canActivate: [isAuthenticatedGuard],
    component: HomepageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
