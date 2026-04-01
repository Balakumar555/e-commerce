import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  username = '';
  wishlistCount = 0;
  cartCount = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.username = localStorage.getItem('username') || 'User';
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.wishlistCount = wishlist.length;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartCount = cart.length;
  }
  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
   goToProducts() {
    this.router.navigate(['/products']);
  }
}
