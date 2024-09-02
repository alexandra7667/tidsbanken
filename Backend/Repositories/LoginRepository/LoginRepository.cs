using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using backend.Security;
namespace backend.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly Context _databaseContext;
        private readonly TokenService _tokenService;

        public LoginRepository(Context db, TokenService tokenService)
        {
            _databaseContext = db;
            _tokenService = tokenService;
        }

        public async Task<User?> AuthenticateUser(LoginPayload loginRequest)
        {
            User? user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if(user == null || !PasswordHasher.VerifyPassword(loginRequest.Password, user.Password)) { //Hashes password from the request to match it against the hashed password in the database
                //Wrong email or password
                return null;
            }

            return user;
        }

        public string GenerateToken(User user)
        {
            var token = _tokenService.GenerateToken(user);
            return token;
        }
    }
}