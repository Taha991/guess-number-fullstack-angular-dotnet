using GuessNumber.API.DTOs;

namespace GuessNumber.API.Services;

public interface IGameService
{
    Task<StartGameResponseDto> StartGameAsync(int userId);
    Task<GuessResponseDto?> MakeGuessAsync(int userId, int gameSessionId, int guess);
}

