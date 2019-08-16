import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterProducts: Product[] = [];
  shoppingCart: any;
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    this.productService
      .getAll()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Product));
        })
      )
      .subscribe(products => {
        this.products = products;
        this.route.queryParamMap.subscribe(params => {
          this.category = params.get('category');

          this.filterProducts = this.category
            ? this.products.filter(p => p.category === this.category)
            : this.products;
        });
      });
  }
  async ngOnInit() {
    (await this.cartService.getCart()).subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
    });
  }
}
