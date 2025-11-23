import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService, LeaderboardEntry } from '../../services/user.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div class="card leaderboard-card">
        <h1 class="text-center mb-4">🏆 Leaderboard</h1>
        <p class="text-center mb-4 leaderboard-description">
          Top players ranked by their best scores (lower is better!)
        </p>

        <div class="loading" *ngIf="loading">
          Loading leaderboard...
        </div>

        <div class="leaderboard-empty" *ngIf="!loading && leaderboard.length === 0">
          <p>No scores yet. Be the first to play!</p>
        </div>

        <div class="leaderboard-table" *ngIf="!loading && leaderboard.length > 0">
          <div class="leaderboard-header">
            <div class="rank-col">Rank</div>
            <div class="username-col">Username</div>
            <div class="score-col">Best Score</div>
          </div>
          <div
            class="leaderboard-row"
            *ngFor="let entry of leaderboard; let i = index"
            [class.top-three]="i < 3"
          >
            <div class="rank-col">
              <span class="rank-number" *ngIf="i >= 3">{{ i + 1 }}</span>
              <span class="medal" *ngIf="i === 0">🥇</span>
              <span class="medal" *ngIf="i === 1">🥈</span>
              <span class="medal" *ngIf="i === 2">🥉</span>
            </div>
            <div class="username-col">{{ entry.username }}</div>
            <div class="score-col">
              <span class="score-badge">{{ entry.bestScore }}</span>
            </div>
          </div>
        </div>

        <div class="leaderboard-actions">
          <a routerLink="/dashboard" class="btn btn-primary">
            Back to Game
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leaderboard-card {
      max-width: 800px;
      margin: 2rem auto;
    }

    h1 {
      font-size: 2.5rem;
      color: var(--text-primary);
    }

    .leaderboard-description {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
    }

    .leaderboard-empty {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
    }

    .leaderboard-table {
      margin: 2rem 0;
    }

    .leaderboard-header {
      display: grid;
      grid-template-columns: 80px 1fr 150px;
      gap: 1rem;
      padding: 1rem;
      background: var(--background);
      border-radius: 8px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .leaderboard-row {
      display: grid;
      grid-template-columns: 80px 1fr 150px;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
      background: var(--surface);
      border: 2px solid transparent;

      &:hover {
        background: var(--background);
        border-color: var(--border);
        transform: translateX(4px);
      }

      &.top-three {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border-color: var(--warning);
        font-weight: 600;
      }
    }

    .rank-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .username-col {
      display: flex;
      align-items: center;
    }

    .score-col {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .rank-number {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--text-secondary);
    }

    .medal {
      font-size: 2rem;
    }

    .score-badge {
      background: var(--primary);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 1.1rem;
    }

    .top-three .score-badge {
      background: var(--warning);
    }

    .leaderboard-actions {
      margin-top: 2rem;
      text-align: center;
    }
  `]
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardEntry[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.loading = true;
    this.userService.getLeaderboard().subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load leaderboard:', error);
        this.loading = false;
      }
    });
  }
}

