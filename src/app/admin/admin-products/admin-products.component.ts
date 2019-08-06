import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular7-data-table';
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
  items: Product[] = [];
  itemCount: number;
  prodSubscription: Subscription;
  tableResource: DataTableResource<Product>;
  constructor(private productService: ProductService) {
    this.prodSubscription = this.productService
      .getAll()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() } as Product));
        })
      )
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }

    this.tableResource.query(params).then(items => (this.items = items));
  }

  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      : this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.prodSubscription.unsubscribe();
  }
}
