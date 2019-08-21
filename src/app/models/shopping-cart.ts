import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[]) {}

  get totalItemsCount() {
    let count = 0;
    for (const productId in this.items) {
      if (productId) {
        count += this.items[productId].quantity;
      }
    }
    return count;
  }
}
