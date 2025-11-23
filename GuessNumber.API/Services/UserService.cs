using GuessNumber.API.Data;
using GuessNumber.API.DTOs;
using Microsoft.EntityFrameworkCore;

namespace GuessNumber.API.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;

    public UserService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int?> GetBestScoreAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        return user?.BestScore;
    }

    public async Task<List<LeaderboardEntryDto>> GetLeaderboardAsync()
    {
        return await _context.Users
            .Where(u => u.BestScore != null)
            .OrderBy(u => u.BestScore)
            .ThenBy(u => u.Username)
            .Select(u => new LeaderboardEntryDto
            {
                Username = u.Username,
                BestScore = u.BestScore
            })
            .ToListAsync();
    }
}

