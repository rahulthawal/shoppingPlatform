import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private cartId: { [productId: string]: ShoppingCartItem }) {
    this.cartId = cartId || {};

    for (const productId in cartId) {
      if (productId) {
        const item = cartId[productId];
        this.items.push(new ShoppingCartItem({ ...item, $key: productId }));
      }
    }
  }

  getQuantity(product: Product) {
    const item = this.cartId[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (const productId in this.items) {
      if (productId) {
        sum += this.items[productId].totalPrice;
      }
    }
    return sum;
  }

  get totalItemsCount() {
    let cartItem = 0;
    for (const productId in this.cartId) {
      if (productId) {
        cartItem += this.cartId[productId].quantity;
      }
    }
    return cartItem;
  }
}
