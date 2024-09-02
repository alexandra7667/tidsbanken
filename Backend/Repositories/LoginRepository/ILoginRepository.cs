using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface ILoginRepository
    {
        public Task<User?> AuthenticateUser(LoginPayload loginRequest);
        public Task<string> GenerateToken(User user);
    }
}