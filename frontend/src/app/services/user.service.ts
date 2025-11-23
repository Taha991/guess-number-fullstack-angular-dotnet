import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BestScoreResponse {
  bestScore: number | null;
}

export interface LeaderboardEntry {
  username: string;
  bestScore: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBestScore(): Observable<BestScoreResponse> {
    return this.http.get<BestScoreResponse>(`${this.apiUrl}/api/user/best-score`);
  }

  getLeaderboard(): Observable<LeaderboardEntry[]> {
    return this.http.get<LeaderboardEntry[]>(`${this.apiUrl}/api/user/leaderboard`);
  }
}

