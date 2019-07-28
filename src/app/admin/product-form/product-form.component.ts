import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAll();
    console.log(this.categories$);
  }

  ngOnInit() {}
}
