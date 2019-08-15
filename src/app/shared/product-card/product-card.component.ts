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
  constructor(private cartService: ShoppingCartService) {}
  addToCart(product: Product) {
    // console.log('Product', product);
    this.cartService.addToCart(product);
  }
  ngOnInit() {}
}
