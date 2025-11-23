namespace GuessNumber.API.DTOs;

public class LeaderboardEntryDto
{
    public string Username { get; set; } = string.Empty;
    public int? BestScore { get; set; }
}

