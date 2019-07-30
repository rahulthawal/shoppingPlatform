import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(private categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {}

  save(product) {
    if (product) {
      this.productService.create(product);
    }
  }
}
