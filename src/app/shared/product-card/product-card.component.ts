import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Input() showActions;
  @Input() shoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) {
      return 0;
    }
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
  ngOnInit() {}
}
