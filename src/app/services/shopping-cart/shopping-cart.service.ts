import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/internal/operators/take';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getItem(cartId: string, productKey: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.getItem(cartId, product.key);
    const item$ = itemRef.snapshotChanges();
    item$.pipe(take(1)).subscribe(item => {
      itemRef.update({ product: product, quantity: (item.payload.val()['quantity'] || 0) + 1 });
    });
  }
}
