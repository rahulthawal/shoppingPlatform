import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from '../../models/shopping-cart';

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

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    const cart = this.db
      .object('/shopping-carts/' + cartId)
      .snapshotChanges()
      .pipe(
        map((result: any) => {
          const items = result.payload.val().items;
          return new ShoppingCart(items);
        })
      );
    return cart;
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productKey: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private async updateItem(product: Product, change: number) {
    if (product && change) {
      const cartId = await this.getOrCreateCartId();
      const itemRef = this.getItem(cartId, product.title);
      const item$ = itemRef.snapshotChanges();

      item$.pipe(take(1)).subscribe(item => {
        let quantityCheck;
        quantityCheck = item.payload.val() !== null ? item.payload.val()['quantity'] : 0;
        const quantity = ( quantityCheck ) + change;
        if (quantity === 0) { itemRef.remove(); } else {
          itemRef.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
        }
      });
    }
  }
}
