import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  bestScore: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private usernameKey = 'username';
  private bestScoreKey = 'best_score';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/register`, registerData)
      .pipe(
        tap(response => this.saveAuthData(response))
      );
  }

  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/api/auth/login`, loginData)
      .pipe(
        tap(response => this.saveAuthData(response))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.bestScoreKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getBestScore(): number | null {
    const score = localStorage.getItem(this.bestScoreKey);
    return score ? parseInt(score, 10) : null;
  }

  updateBestScore(score: number): void {
    localStorage.setItem(this.bestScoreKey, score.toString());
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private saveAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.usernameKey, response.username);
    if (response.bestScore !== null) {
      localStorage.setItem(this.bestScoreKey, response.bestScore.toString());
    }
  }
}

