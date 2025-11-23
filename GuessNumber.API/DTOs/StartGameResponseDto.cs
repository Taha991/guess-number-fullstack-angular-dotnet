namespace GuessNumber.API.DTOs;

public class StartGameResponseDto
{
    public int GameSessionId { get; set; }
    public string Message { get; set; } = "Game started! Guess a number between 1 and 43.";
}

