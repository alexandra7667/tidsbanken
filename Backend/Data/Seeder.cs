using Backend.Models;

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
                Password = "Admin123456",
                Email = "Admin@admin.com",
                ProfilePicture = "...",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Role = Enums.Role.ADMIN,
                });
        }
        public List<User> Users { get { return _users; } }

    }
}