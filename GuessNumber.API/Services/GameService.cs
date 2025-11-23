using GuessNumber.API.Data;
using GuessNumber.API.DTOs;
using GuessNumber.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GuessNumber.API.Services;

public class GameService : IGameService
{
    private readonly ApplicationDbContext _context;
    private readonly Random _random = new();

    public GameService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<StartGameResponseDto> StartGameAsync(int userId)
    {
        // Close any existing active game sessions
        var activeSessions = await _context.GameSessions
            .Where(gs => gs.UserId == userId && !gs.IsCompleted)
            .ToListAsync();

        foreach (var session in activeSessions)
        {
            session.IsCompleted = true;
        }

        // Create new game session
        var targetNumber = _random.Next(1, 44); // 1 to 43 inclusive

        var gameSession = new GameSession
        {
            UserId = userId,
            TargetNumber = targetNumber,
            Attempts = 0,
            IsCompleted = false
        };

        _context.GameSessions.Add(gameSession);
        await _context.SaveChangesAsync();

        return new StartGameResponseDto
        {
            GameSessionId = gameSession.Id,
            Message = "Game started! Guess a number between 1 and 43."
        };
    }

    public async Task<GuessResponseDto?> MakeGuessAsync(int userId, int gameSessionId, int guess)
    {
        var gameSession = await _context.GameSessions
            .Include(gs => gs.User)
            .FirstOrDefaultAsync(gs => gs.Id == gameSessionId && gs.UserId == userId);

        if (gameSession == null || gameSession.IsCompleted)
        {
            return null;
        }

        gameSession.Attempts++;

        var response = new GuessResponseDto
        {
            Attempts = gameSession.Attempts
        };

        if (guess < gameSession.TargetNumber)
        {
            response.Result = "higher";
            response.IsCorrect = false;
        }
        else if (guess > gameSession.TargetNumber)
        {
            response.Result = "lower";
            response.IsCorrect = false;
        }
        else
        {
            // Correct guess!
            response.Result = "correct";
            response.IsCorrect = true;
            gameSession.IsCompleted = true;

            // Update best score if this is better
            var user = gameSession.User;
            if (user.BestScore == null || gameSession.Attempts < user.BestScore)
            {
                user.BestScore = gameSession.Attempts;
                response.NewBestScore = gameSession.Attempts;
            }
        }

        await _context.SaveChangesAsync();

        return response;
    }
}

