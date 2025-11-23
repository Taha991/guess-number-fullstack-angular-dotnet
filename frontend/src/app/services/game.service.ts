import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface StartGameResponse {
  gameSessionId: number;
  message: string;
}

export interface GuessRequest {
  guess: number;
}

export interface GuessResponse {
  result: string;
  attempts: number;
  isCorrect: boolean;
  newBestScore?: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  startGame(): Observable<StartGameResponse> {
    return this.http.post<StartGameResponse>(`${this.apiUrl}/api/game/start`, {});
  }

  makeGuess(gameSessionId: number, guess: number): Observable<GuessResponse> {
    return this.http.post<GuessResponse>(
      `${this.apiUrl}/api/game/guess?gameSessionId=${gameSessionId}`,
      { guess }
    );
  }
}

