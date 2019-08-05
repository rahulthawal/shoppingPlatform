import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  prodSubscription: Subscription;
  constructor(private productService: ProductService) {
    this.prodSubscription = this.productService
      .getAll()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Product));
        })
      )
      .subscribe(products => {
        this.filteredProducts = this.products = products;
      });
  }
  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.prodSubscription.unsubscribe();
  }
}
