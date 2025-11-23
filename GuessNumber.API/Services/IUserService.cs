using GuessNumber.API.DTOs;

namespace GuessNumber.API.Services;

public interface IUserService
{
    Task<int?> GetBestScoreAsync(int userId);
    Task<List<LeaderboardEntryDto>> GetLeaderboardAsync();
}

