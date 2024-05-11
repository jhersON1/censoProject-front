import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "./auth/guards";
import { HomepageComponent } from "./pages/homepage/homepage.component";
import { DataTableComponent } from "./pages/data-table/data-table.component";
import { CensoFormComponent } from "./pages/censo-form/censo-form.component";

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.routes').then( m => m.authRoutes)
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
  {
    path: 'users',
    canActivate: [ isAuthenticatedGuard ],
    component: DataTableComponent
  },
  {
    path: 'create-form',
    canActivate: [ isAuthenticatedGuard ],
    component: CensoFormComponent
  },
  // TODO: show forms for admins and users
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
