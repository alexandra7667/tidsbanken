using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;
using Backend.Models;

namespace Backend.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string ProfilePicture { get; set; }
        public int Phone { get; set; }
        public string Role { get; set; }


        public UserDTO(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
            Phone = user.Phone;
            ProfilePicture = user.ProfilePicture;
            Role = user.Role;
        }
    }
}
