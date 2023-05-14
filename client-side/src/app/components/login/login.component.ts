import { Component} from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    username: string = ''
    password: string = ''

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private toastrService: ToastrService
    ) { }


  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.loginUser(user).subscribe(data => {
        if(data.success) {
          const token = data.token;
          const expiresIn = 604800;
          this.authService.storeUserData(token, user);
          this.toastrService.success('You are now logged in', 'Success', {toastClass: 'alert alert-success', timeOut: 5000});
          this.router.navigate(['cart']);
        } else {
          this.toastrService.error('wrong username or password', 'Error', {toastClass: 'alert alert-danger', timeOut: 5000});
          this.router.navigate(['login']);
        }
    });
  }


}
