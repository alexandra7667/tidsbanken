using Backend.Models;
using backend.Security;

namespace Backend.Data
{
    public class Seeder
    {
        private List<User> _users = new List<User>();

        public Seeder()
        {
            _users.Add(new User {
                Id = 1,
                Name = "Admin",
                Password = PasswordHasher.HashPassword("Admin123456"),
                Email = "Admin@admin.com",
                ProfilePicture = "...",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Role = Enums.Role.ADMIN,
                });
        }
        public List<User> Users { get { return _users; } }

    }
}