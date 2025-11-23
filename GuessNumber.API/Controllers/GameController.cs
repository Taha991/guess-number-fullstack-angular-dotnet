using System.Security.Claims;
using GuessNumber.API.DTOs;
using GuessNumber.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GuessNumber.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GameController : ControllerBase
{
    private readonly IGameService _gameService;
    private int UserId => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpPost("start")]
    public async Task<ActionResult<StartGameResponseDto>> StartGame()
    {
        var result = await _gameService.StartGameAsync(UserId);
        return Ok(result);
    }

    [HttpPost("guess")]
    public async Task<ActionResult<GuessResponseDto>> MakeGuess([FromBody] GuessDto guessDto, [FromQuery] int gameSessionId)
    {
        var result = await _gameService.MakeGuessAsync(UserId, gameSessionId, guessDto.Guess);

        if (result == null)
        {
            return BadRequest(new { message = "Invalid game session or game already completed" });
        }

        return Ok(result);
    }
}

