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
        private DatabaseContext _databaseContext;

        public UserRepository(DatabaseContext databaseContext){
            _databaseContext = databaseContext;
        }

        public Task<User?> GetUserById(int UserId)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(u => u.Id == UserId);

            return user;
        }

        public Task<User?> AuthenticateUser(LoginPayload loginRequest)
        {
            var user = await _databaseContext.Users.FirstOrDefaultAsync(u => user.Email == loginRequest.Email);

            if(!user || user.Password != loginRequest.Password) {
                //User does not exist or Wrong email or password
            }

            return user;
        }

        public Task<User?> AddUser(AddUserPayload payload)
        {
            DateTime ca = DateTime.UtcNow;

            var user = new User
            {
                Name = payload.Name;
                Password = payload.Password;
                Email = payload.Email;
                CreatedAt = ca;
                UpdatedAt = ca;
            };

            return user;
        }

        public Task<IEnumerable<User>?> GetAllUsers()
        {
            var users = await _databaseContext.Users.ToListAsync();

            return users;
        }

        public Task<boolean> DeleteUser(int UserId)
        {
            var user = await _databaseContext.Users.FindAsync(userId);

            if (user == null)
            {
                return false;
            }

            _databaseContext.Users.Remove(user);

            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public Task<User?> UpdatePassword(User user, string newPassword)
        {
            user.Password = newPassword;

            await _databaseContext.SaveChangesAsync();

            return user;
        }

        public Task<User?> UpdateEmail(User user, string newEmail);
        {
            user.Email = newEmail;

            await _databaseContext.SaveChangesAsync();

            return user;
        }
    }
}