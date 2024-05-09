import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";


@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    RouterOutlet, LoginComponent, RegisterComponent,
  ],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export default class AuthLayoutComponent {

}
