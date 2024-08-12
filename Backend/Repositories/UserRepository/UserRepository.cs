using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        public Task<User?> GetUserById(int Userid)
        {
            throw new NotImplementedException();
        }

        public Task<User?> AuthenticateUser(LoginPayload loginPayload)
        {
            throw new NotImplementedException();
        }

        public Task<User?> AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>?> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteUser(int Userid)
        {
            throw new NotImplementedException();
        }
    }
}