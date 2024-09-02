using backend.Models;
using backend.Data;
using backend.Payloads;
using backend.Services;
using Microsoft.AspNetCore.Identity;
using backend.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly DatabaseContext _databaseContext;
        private readonly TokenService _tokenService;

        public UserRepository(DatabaseContext db, TokenService tokenService)
        {
            _databaseContext = db;
            _tokenService = tokenService;
        }

        public async Task<User?> AuthenticateUser(LoginPayload loginRequest)
        {
            User? user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if(user == null || user.Password != loginRequest.Password) {
                //Wrong email or password
                return null;
            }

            return user;
        }

        public async Task<string> Login(User user)
        {
            var token = _tokenService.GenerateToken(user);

            return token;
        }
    }
}