using System.Security.Claims;

namespace GuessNumber.API.Services;

public interface ITokenService
{
    string GenerateToken(string username, int userId);
    ClaimsPrincipal? ValidateToken(string token);
}

