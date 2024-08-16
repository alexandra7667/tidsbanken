using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
using  Microsoft.EntityFrameworkCore;
namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private Context _databaseContext;

        public UserRepository(Context databaseContext){
            _databaseContext = databaseContext;
        }

        public async Task<User?> GetUserById(int UserId)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Id == UserId);

            return user;
        }

        public async Task<User?> AuthenticateUser(LoginPayload loginRequest)
        {
            User? user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if(user == null || user.Password != loginRequest.Password) {
                //User does not exist or Wrong email or password
            }

            return user;
        }

        public async Task<User?> AddUser(AddUserPayload payload)
        {
            DateTime ca = DateTime.UtcNow;

            var user = new User
            {
                Name = payload.Name,
                Password = payload.Password,
                Email = payload.Email,
                CreatedAt = ca,
                UpdatedAt = ca,
            };

            await _databaseContext.Users.AddAsync(user);

            await _databaseContext.SaveChangesAsync();

            return user;
        }

        public async Task<IEnumerable<User>?> GetAllUsers()
        {
            var users = await _databaseContext.Users.ToListAsync();

            return users;
        }

        public async Task<bool> DeleteUser(int UserId)
        {
            var user = await _databaseContext.Users.FindAsync(UserId);

            if (user == null)
            {
                return false;
            }

            _databaseContext.Users.Remove(user);

            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<User?> UpdatePassword(User user, string newPassword)
        {
            user.Password = newPassword;

            await _databaseContext.SaveChangesAsync();

            return user;
        }

        public async Task<User?> UpdateEmail(User user, string newEmail)
        {
            user.Email = newEmail;

            await _databaseContext.SaveChangesAsync();

            return user;
        }
    }
}