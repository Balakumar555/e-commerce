import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from '../cart-list/cart-list';

export interface Product {
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
}

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-listing.html',
  styleUrls: ['./product-listing.scss']
})
export class ProductListingComponent implements OnInit {
  searchQuery = '';
  selectedCategory = 'All';
  sortBy = 'featured';
  viewMode: 'grid' | 'list' = 'grid';
  cartCount = 0;
  wishlist: number[] = [];
  cartItems: any[] = [];

  categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Beauty'];

  products: Product[] = [
    { id: 1, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 2999, originalPrice: 4999, rating: 4.5, reviews: 1280, image: '🎧', badge: 'Best Seller', inStock: true },
    { id: 2, name: 'Premium Running Shoes', category: 'Sports', price: 3499, originalPrice: 4200, rating: 4.3, reviews: 876, image: '👟', badge: 'New', inStock: true },
    { id: 3, name: 'Smart Watch Pro', category: 'Electronics', price: 8999, originalPrice: 12000, rating: 4.7, reviews: 2340, image: '⌚', badge: 'Hot', inStock: true },
    { id: 4, name: 'Linen Casual Shirt', category: 'Fashion', price: 899, originalPrice: 1500, rating: 4.1, reviews: 430, image: '👔', inStock: true },
    { id: 5, name: 'Aromatherapy Diffuser', category: 'Home', price: 1299, originalPrice: 1800, rating: 4.4, reviews: 650, image: '🕯️', inStock: false },
    { id: 6, name: 'Vitamin C Serum', category: 'Beauty', price: 799, originalPrice: 1200, rating: 4.6, reviews: 990, image: '🧴', badge: 'Trending', inStock: true },
    { id: 7, name: 'Mechanical Keyboard', category: 'Electronics', price: 4599, originalPrice: 5500, rating: 4.8, reviews: 1760, image: '⌨️', inStock: true },
    { id: 8, name: 'Yoga Mat Pro', category: 'Sports', price: 1199, originalPrice: 1600, rating: 4.2, reviews: 520, image: '🧘', inStock: true },
    { id: 9, name: 'Ceramic Coffee Mug Set', category: 'Home', price: 649, originalPrice: 999, rating: 4.0, reviews: 310, image: '☕', inStock: true },
    { id: 10, name: 'Sunglasses UV400', category: 'Fashion', price: 1599, originalPrice: 2200, rating: 4.3, reviews: 710, image: '🕶️', badge: 'New', inStock: true },
    { id: 11, name: 'Bluetooth Speaker', category: 'Electronics', price: 2299, originalPrice: 3000, rating: 4.5, reviews: 1100, image: '🔊', inStock: false },
    { id: 12, name: 'Face Moisturizer SPF50', category: 'Beauty', price: 1099, originalPrice: 1500, rating: 4.4, reviews: 820, image: '🧖', inStock: true },
  ];

  get filteredProducts(): Product[] {
    let result = [...this.products];

    if (this.selectedCategory !== 'All') {
      result = result.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    switch (this.sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
      case 'newest':     result.sort((a, b) => b.id - a.id); break;
    }

    return result;
  }

ngOnInit() {
  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  this.cartCount = cart.length;
  this.cartItems = cart; // if you display cart items on the listing page too
  this.wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
}

  addToCart(product: Product) {
  if (!product.inStock) return;

  const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  this.cartItems = cart;
  this.cartCount = cart.length; // <= update this after add
  alert(`${product.name} added to cart!`);
}

  cartList() {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    //console.log('Cart Items:', this.cartItems);
    this.router.navigate(['/cart'], { state: { cartItems: this.cartItems } });
  }

  toggleWishlist(id: number) {
    const idx = this.wishlist.indexOf(id);
    if (idx > -1) this.wishlist.splice(idx, 1);
    else this.wishlist.push(id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
  }

  isWishlisted(id: number): boolean {
    return this.wishlist.includes(id);
  }

  getDiscount(p: Product): number {
    return Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.floor(rating) ? 'full' : i < rating ? 'half' : 'empty'
    );
  }

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}