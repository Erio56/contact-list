import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent {
  form: FormGroup;

  constructor(private router: Router, private auth:AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  createAccount() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      console.log('Account created:', { username, password });
      this.auth.createAccount(username, password).subscribe(
        {
          next: (response)=>{
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => console.log(error)
        }
      )
    }
  }
}
