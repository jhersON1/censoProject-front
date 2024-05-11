import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2'
import { NabbarComponent } from "../../../shared/navbar/nabbar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, ReactiveFormsModule, CommonModule, NabbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router )

  public loginForm: FormGroup = this.fb.group({
    mail:    ['paul@gmail.com', [ Validators.required, Validators.email ]],
    password: ['Abc1234', [ Validators.required, Validators.minLength(6) ]],
  });

  signUp() {
    const { mail, password } = this.loginForm.value;
    this.authService.login(mail, password)
      .subscribe({
        next: (res) => {

          this.router.navigateByUrl('/homepage').then((success) => {
            if (success) {
              console.log('Success navigate');
            }
          })
        },
        error: (message) => {
          Swal.fire('Error', message, 'error' )
        }
      })
  }

  public goRegister() {
    this.router.navigateByUrl('auth/register').then((success) => {
      if (!success) {
        console.log('Login: error navigation');
      }
    })
  }
}
