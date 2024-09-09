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

            Console.WriteLine("IN REPO. USER=", user);

            if (user == null)
            {
                Console.WriteLine("User not found");
                return null;  // User does not exist
            }

            if (!PasswordHasher.VerifyPassword(loginRequest.Password, user.Password))
            {
                Console.WriteLine("Password mismatch");
                return null;  // Password does not match
            }

            Console.WriteLine("User authenticated successfully");
            return user;
        }


        public string GenerateToken(User user)
        {
            var token = _tokenService.GenerateToken(user);
            return token;
        }
    }
}