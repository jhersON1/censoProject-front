import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  #fb = inject(FormBuilder);
  #authService = inject(AuthService);
  #router = inject(Router);

  repeatPass: string = 'none';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public registerForm: FormGroup = this.#fb.group({
    email: ['pedro@gmail.com', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
    password: ['Abc1234', [Validators.required, Validators.minLength(6)]],
    name: ['pedro', [Validators.required, Validators.minLength(2)]],
    lastName: ['mendez', [Validators.required, Validators.minLength(3)]],
    dni: ['80654524', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['Abc1234', [Validators.required, Validators.minLength(6)]],
    adminCode: ['6e866637-4590-44b3-b026-f2bc9dcb77f5', [Validators.required, Validators.minLength(8)]],
  });

  hidePassword = true;
  hideConfirmPassword = true;

  registerSubmitted(){
    if(this.Password.value == this.ConfirmPassword.value){
      this.repeatPass = 'none';
      if (this.registerForm.valid){
        this.repeatPass = 'none';
        this.register();
      }else{
        this.registerForm.markAllAsTouched();
      }
    }else{
      this.repeatPass = 'inline';
      this.registerForm.markAllAsTouched();
    }
  }

  get Name(): FormControl{
    return this.registerForm.get("name") as FormControl;
  }
  get LastName(): FormControl{
    return this.registerForm.get("lastName") as FormControl;
  }
  get Email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }
  get Password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  get ConfirmPassword(): FormControl{
    return this.registerForm.get("confirmPassword") as FormControl;
  }
  get Ci(): FormControl{
    return this.registerForm.get("dni") as FormControl;
  }
  get AdminPassword(): FormControl{
    return this.registerForm.get("adminCode") as FormControl;
  }

  public register() {
    const {confirmPassword, ...body} = this.registerForm.value;

    this.#authService.register(body).subscribe({
      next: () => {
        Swal.fire({
          title: 'Done',
          text: 'Your account has been created'
        }).then((result) => {
          if (result.isConfirmed) {
            this.#router.navigateByUrl('/homepage').then((success) => {
              if (success) {
                console.log('Success navigate');
              }
            })
          }
        })

      },
      error: (message) => {
        Swal.fire('Error', message as string, 'error' )
      }
    })
  }

  public goLogin() {
    this.#router.navigateByUrl('auth/login').then((success) => {
      if (!success) {
        console.log('Register: error navigation');
      }
    })
  }
}
