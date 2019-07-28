import { Component } from '@angular/core';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;
  constructor(private auth: AuthService) {
    auth.appUser$.subscribe(appUser => appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
}
