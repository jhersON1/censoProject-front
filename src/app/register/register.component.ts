import { Component } from '@angular/core';
import { FormControl, FormsModule, Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    CommonModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  repeatPass: string = 'none';
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  registerForm = new FormGroup({
    name: new FormControl("", [
      Validators.required, 
      Validators.minLength(4),
    ]),
    lastName: new FormControl("", [
      Validators.required, 
      Validators.minLength(4),
    ]),
    ci: new FormControl("", [
      Validators.required,
      Validators.minLength(7),
    ]),
    email: new FormControl("",[
      Validators.required, 
      Validators.email,
      Validators.pattern(this.emailPattern),
    ]),
    password: new FormControl("", [
      Validators.required, 
      Validators.minLength(6), 
      Validators.maxLength(15),
    ]),
    confirmPassword: new FormControl("", ),
    adminPassword: new FormControl("",[
      Validators.required,
      Validators.minLength(8)
    ])
  });

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private http: HttpClient, private formBuilder: FormBuilder){
    
  }

  registerSubmited(){
    if(this.Password.value == this.ConfirmPassword.value){
      this.repeatPass = 'none';
      if (this.registerForm.valid){
        this.repeatPass = 'none';
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
    return this.registerForm.get("ci") as FormControl;
  }
  get AdminPassword(): FormControl{
    return this.registerForm.get("adminPassword") as FormControl;
  }
  
}
