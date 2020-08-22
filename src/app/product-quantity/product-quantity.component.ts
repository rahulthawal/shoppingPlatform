import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input() product: Product;
  @Input() shoppingCart: ShoppingCart;

  ngOnInit(): void {
  }

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
