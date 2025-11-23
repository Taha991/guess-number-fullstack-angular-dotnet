using System.Security.Claims;
using GuessNumber.API.DTOs;
using GuessNumber.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuessNumber.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("best-score")]
    public async Task<ActionResult<int?>> GetBestScore()
    {
        var bestScore = await _userService.GetBestScoreAsync(UserId);
        return Ok(new { bestScore });
    }

    [HttpGet("leaderboard")]
    public async Task<ActionResult<List<LeaderboardEntryDto>>> GetLeaderboard()
    {
        var leaderboard = await _userService.GetLeaderboardAsync();
        return Ok(leaderboard);
    }
}

