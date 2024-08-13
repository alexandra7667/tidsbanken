using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;
using Backend.Models;
using Backend.Enums;

namespace Backend.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ProfilePicture { get; set; }
        public Role Role { get; set; }

        public UserDTO(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
            ProfilePicture = user.ProfilePicture;
            Role = user.Role;
        }
    }
}
