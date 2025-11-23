using System.ComponentModel.DataAnnotations;

namespace GuessNumber.API.DTOs;

public class GuessDto
{
    [Required]
    [Range(1, 43)]
    public int Guess { get; set; }
}

