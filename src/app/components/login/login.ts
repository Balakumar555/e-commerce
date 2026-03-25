import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
username = '';
  password = '';
  errorMessage = '';
  showPassword = false;
  isLoading = false;

  constructor(private router: Router) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Simulate async login (replace with real API call)
    setTimeout(() => {
      // Store in localStorage
      localStorage.setItem('username', this.username);
      localStorage.setItem('password', this.password); // ⚠️ hash in production!
      localStorage.setItem('isLoggedIn', 'true');

      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 1000);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
