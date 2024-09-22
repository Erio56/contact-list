import { AuthService } from './../../../core/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private auth: AuthService){}

  logout(){
    this.auth.logout();
  }
}
