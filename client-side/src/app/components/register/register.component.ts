import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from '../../service/auth.service'
import { ValidateService } from '../../service/validate.service';
// import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private router: Router,
    private forms: FormsModule,
    private reactiveForms:ReactiveFormsModule,) { 
    
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Validating fields
    if(!this.validateService.validateRegister(user)){
      this.toastr.error('Please fill in all fields', 'Error', {timeOut: 3000});
      return false
    }
    if(!this.validateService.validateEmail(user.email)){
      this.toastrService.error('Please use a valid email', 'Error', {timeOut: 3000});
      return false
    }

    // Registration
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.toastrService.success('Registration successful, redirecting to login', 'Success', {timeOut: 3000});
        this.router.navigate(['/login']);
      } else {
        this.toastrService.error('Registration failed', 'Error', {timeOut: 3000});
        this.router.navigate(['/register']);
      }
    });

    return undefined
  } 
   

}