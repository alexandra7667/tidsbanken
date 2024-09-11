using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
using Microsoft.EntityFrameworkCore;
using backend.Security;
namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private Context _databaseContext;

        public UserRepository(Context databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<User?> GetUserById(int userId)
        {
            var user = await _databaseContext.Users
                .Include(u => u.VacationRequests) // Include VacationRequests
                .FirstOrDefaultAsync(u => u.Id == userId);

            return user;
        }

        public async Task<User?> AddUser(AddUserPayload payload)
        {
            DateTime ca = DateTime.UtcNow;

            //Hash password
            string hashedPassword = PasswordHasher.HashPassword(payload.Password);

            var user = new User
            {
                Name = payload.Name,
                Password = hashedPassword,
                Email = payload.Email,
                ProfilePicture = "...",
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

            //@Todo Remove all user's vacation requests and comments

            _databaseContext.Users.Remove(user);

            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<User?> UpdatePassword(User user, string newPassword)
        {
            string hashedPassword = PasswordHasher.HashPassword(newPassword);
            user.Password = hashedPassword;

            await _databaseContext.SaveChangesAsync();

            return user;
        }

        public async Task<User?> UpdateEmail(User user, string newEmail)
        {
            user.Email = newEmail;

            await _databaseContext.SaveChangesAsync();

            return user;
        }

        public async Task<User?> UpdateName(User user, string newName)
        {
            user.Name = newName;

            await _databaseContext.SaveChangesAsync();

            return user;
        }
    }
}