import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UsersService, 
    private router: Router ) {
    this.formRegister = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  //Send to userService a form and redirect to chat 
  onSubmit(){
    this.userService.register(this.formRegister.value).subscribe({
      next: (res: any) => {
        this.router.navigate(['/chat']);
      },
      error: (err: any) => {
        alert("We have connection error");
      }
    })
  }
}
