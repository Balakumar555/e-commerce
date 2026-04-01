import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  inStock: boolean;
  quantity: number;
}

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-list.html',
  styleUrls: ['./cart-list.scss'],
})
export class CartList implements OnInit {
  cartItems: CartItem[] = [];
  viewMode: 'grid' | 'list' = 'grid';

   constructor() {}


  ngOnInit() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = cart;
  }
  removeFromCart(product: CartItem) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter((item: CartItem) => item.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.cartItems = updatedCart;
  }
}
