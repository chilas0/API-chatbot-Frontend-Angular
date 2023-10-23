import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UsersService, 
    private router: Router ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  //Send a form with credentials and receive a true or false
  onSubmit(){
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token_', res.access);
        this.router.navigate(['/chat']);
      },
      error: (err: any) => {
        alert("Incorrect user or password");
      }
    })
  }

  //Redirect to register form 
  register(){
    this.router.navigate(['/register']);
  }

}
