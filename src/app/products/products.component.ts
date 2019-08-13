import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [];
  filterProducts: Product[] = [];

  category: string;
  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filterProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
    });
  }
}
