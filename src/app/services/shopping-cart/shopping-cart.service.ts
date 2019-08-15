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

  async getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges();
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const itemRef = this.db.object('/shopping-carts/' + cartId + '/items/' + product.key);
    const item$ = itemRef.snapshotChanges();
    item$.pipe(take(1)).subscribe(item => {
      if (item.payload.exists()) {
        itemRef.update({ quantity: item.payload.val()['quantity'] + 1 });
      } else {
        itemRef.set({ product: product, quantity: 1 });
      }
    });
  }
}
