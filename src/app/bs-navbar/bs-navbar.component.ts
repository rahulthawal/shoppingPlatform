import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { AuthService } from '../services/auth/auth.service';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private cartservice: ShoppingCartService) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (appUser = appUser));

    this.cart$ = await this.cartservice.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
