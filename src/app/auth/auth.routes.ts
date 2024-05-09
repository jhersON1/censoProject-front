import { Route } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";

export const authRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./layouts/auth-layout/auth-layout.component'),
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', redirectTo: 'login'}
    ]
  }
]
