using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;

namespace Backend.Models
{
    [Table("user")]
    public class User
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("password")]
        public string Password { get; set; }
        [Column("email")]
        public string Email { get; set; }
        [Column("profile_picture")]
        public string ProfilePicture { get; set; }
        [Column("phone")]
        public int Phone { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }
        [Column("role")] {get; set; }
        public string Role;

        public List<Comment> Comments { get; set; }
        public List<VacationRequest> VacationRequests { get; set; }
    }
}