import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$;
  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().pipe(
      map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
    );
    // this.courseRef = db.list('/courses');
    //   this.courses$ = this.courseRef.snapshotChanges().map(changes => {
    //       return changes.map(c => ({ key: c.payload.key, ...c.payload.val()
    //   }));
    //  });
  }
  ngOnInit() {
    this.products$.subscribe(p => {
      console.log('Products', p);
    });
  }
}
