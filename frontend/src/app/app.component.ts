import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="container">
          <div class="nav-content">
            <h1 class="logo">🎯 Guess The Number</h1>
            <div class="nav-links">
              <a routerLink="/dashboard" class="nav-link" *ngIf="isAuthenticated()">Dashboard</a>
              <a routerLink="/leaderboard" class="nav-link" *ngIf="isAuthenticated()">Leaderboard</a>
              <a routerLink="/login" class="nav-link" *ngIf="!isAuthenticated()">Login</a>
              <a routerLink="/register" class="nav-link" *ngIf="!isAuthenticated()">Register</a>
              <button class="btn btn-outline" *ngIf="isAuthenticated()" (click)="logout()">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }

    .navbar {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      box-shadow: 0 2px 10px var(--shadow);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary);
      margin: 0;
    }

    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .nav-link {
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;

      &:hover {
        background: var(--background);
        color: var(--primary);
      }
    }

    main {
      padding: 2rem 0;
    }
  `]
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}

