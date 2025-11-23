import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="container">
      <div class="dashboard-header">
        <div class="welcome-section">
          <h1>Welcome, {{ username }}! 👋</h1>
          <div class="stats">
            <div class="stat-card">
              <div class="stat-label">Best Score</div>
              <div class="stat-value">{{ bestScore ?? 'N/A' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card game-card">
        <h2 class="text-center mb-4">🎯 Guess The Number</h2>
        <p class="text-center mb-4 game-description">
          I'm thinking of a number between 1 and 43. Can you guess it?
        </p>

        <div class="alert alert-info" *ngIf="!gameStarted && !gameCompleted">
          Click "Start New Game" to begin!
        </div>

        <div class="alert alert-success" *ngIf="gameCompleted && lastResult === 'correct'">
          🎉 Congratulations! You guessed it in {{ attempts }} attempt{{ attempts !== 1 ? 's' : '' }}!
          <span *ngIf="newBestScore"> New personal best! 🏆</span>
        </div>

        <div class="game-status" *ngIf="gameStarted && !gameCompleted">
          <div class="status-message" [ngClass]="{
            'status-higher': lastResult === 'higher',
            'status-lower': lastResult === 'lower'
          }">
            <span *ngIf="lastResult === 'higher'">⬆️ Go Higher!</span>
            <span *ngIf="lastResult === 'lower'">⬇️ Go Lower!</span>
            <span *ngIf="!lastResult">Make your first guess!</span>
          </div>
          <div class="attempts-counter">
            Attempts: <strong>{{ attempts }}</strong>
          </div>
        </div>

        <form (ngSubmit)="onGuess()" *ngIf="gameStarted && !gameCompleted" class="guess-form">
          <div class="form-group">
            <label for="guess">Your Guess (1-43)</label>
            <input
              type="number"
              id="guess"
              name="guess"
              [(ngModel)]="currentGuess"
              min="1"
              max="43"
              required
              class="guess-input"
              #guessInput="ngModel"
              [class.error]="guessInput.invalid && guessInput.touched"
            />
            <div class="error-message" *ngIf="guessInput.invalid && guessInput.touched">
              Please enter a number between 1 and 43
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary btn-full"
            [disabled]="guessInput.invalid || loading"
          >
            <span *ngIf="!loading">Submit Guess</span>
            <span *ngIf="loading">Checking...</span>
          </button>
        </form>

        <div class="game-actions">
          <button
            class="btn btn-secondary"
            (click)="startNewGame()"
            [disabled]="loading"
          >
            {{ gameStarted ? 'Start New Game' : 'Start Game' }}
          </button>
          <a routerLink="/leaderboard" class="btn btn-outline">
            View Leaderboard
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header {
      margin-bottom: 2rem;
    }

    .welcome-section h1 {
      font-size: 2.5rem;
      color: white;
      margin-bottom: 1.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    }

    .stats {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.95);
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 12px var(--shadow);
      min-width: 150px;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary);
    }

    .game-card {
      max-width: 600px;
      margin: 0 auto;
    }

    .game-description {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .game-status {
      margin: 2rem 0;
      text-align: center;
    }

    .status-message {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 8px;
      background: var(--background);
    }

    .status-higher {
      color: var(--secondary);
    }

    .status-lower {
      color: var(--warning);
    }

    .attempts-counter {
      font-size: 1.1rem;
      color: var(--text-secondary);
    }

    .guess-form {
      margin: 2rem 0;
    }

    .guess-input {
      font-size: 1.5rem;
      text-align: center;
      font-weight: 600;
      padding: 1rem;
    }

    .game-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      flex-wrap: wrap;
    }

    .game-actions .btn {
      flex: 1;
      min-width: 150px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  username: string | null = null;
  bestScore: number | null = null;
  gameStarted = false;
  gameCompleted = false;
  gameSessionId: number | null = null;
  currentGuess: number | null = null;
  lastResult: string = '';
  attempts = 0;
  loading = false;
  newBestScore: number | null = null;

  constructor(
    private authService: AuthService,
    private gameService: GameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.bestScore = this.authService.getBestScore();
    this.loadBestScore();
  }

  loadBestScore(): void {
    this.userService.getBestScore().subscribe({
      next: (response) => {
        this.bestScore = response.bestScore;
        if (response.bestScore !== null) {
          this.authService.updateBestScore(response.bestScore);
        }
      },
      error: (error) => {
        console.error('Failed to load best score:', error);
      }
    });
  }

  startNewGame(): void {
    this.loading = true;
    this.gameService.startGame().subscribe({
      next: (response) => {
        this.gameSessionId = response.gameSessionId;
        this.gameStarted = true;
        this.gameCompleted = false;
        this.lastResult = '';
        this.attempts = 0;
        this.currentGuess = null;
        this.newBestScore = null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to start game:', error);
        this.loading = false;
      }
    });
  }

  onGuess(): void {
    if (!this.gameSessionId || this.currentGuess === null || this.loading) return;

    this.loading = true;
    this.gameService.makeGuess(this.gameSessionId, this.currentGuess).subscribe({
      next: (response) => {
        this.lastResult = response.result;
        this.attempts = response.attempts;
        this.loading = false;

        if (response.isCorrect) {
          this.gameCompleted = true;
          if (response.newBestScore) {
            this.newBestScore = response.newBestScore;
            this.bestScore = response.newBestScore;
            this.authService.updateBestScore(response.newBestScore);
          }
          this.loadBestScore();
        } else {
          this.currentGuess = null;
        }
      },
      error: (error) => {
        console.error('Failed to make guess:', error);
        this.loading = false;
      }
    });
  }
}

