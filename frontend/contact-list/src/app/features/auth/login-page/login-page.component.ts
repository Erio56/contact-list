import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService){}

  login(): void {
    this.auth.login(this.username, this.password).subscribe(
      {
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }
}
