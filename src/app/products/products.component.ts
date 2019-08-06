import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CategoryService } from '../services/category/category.service';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filterProducts: Product[] = [];

  categories$;
  category: string;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filterProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
    });
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {}
}
