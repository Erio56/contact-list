import { Component } from '@angular/core';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ContactListComponent, NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
