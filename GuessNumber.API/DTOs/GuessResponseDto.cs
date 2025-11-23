namespace GuessNumber.API.DTOs;

public class GuessResponseDto
{
    public string Result { get; set; } = string.Empty; // "higher", "lower", "correct"
    public int Attempts { get; set; }
    public bool IsCorrect { get; set; }
    public int? NewBestScore { get; set; }
}

