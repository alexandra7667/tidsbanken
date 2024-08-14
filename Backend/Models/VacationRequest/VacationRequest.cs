using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Backend.Enums;
namespace Backend.Models
{    
    [Table("vacation_requests")]
    public class VacationRequest
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("start_date")]
        public DateTime StartDate { get; set; }
        [Column("end_date")]
        public DateTime EndDate { get; set; }
        [Column("description")]
        public string Description { get; set; }
        [Column("is_approved")]
        public VacationRequestState IsApproved { get; set; } = VacationRequestState.PENDING;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        // Navigation property for the one-to-many relationship
        public List<Comment> Comments { get; set; }

        [Column("user_id")]
        public int UserId { get; set; } 
        public User User { get; set; }
    }
}
