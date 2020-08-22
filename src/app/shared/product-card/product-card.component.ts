import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})

export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions = true;
  @Input() shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
