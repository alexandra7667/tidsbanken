using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("comments")]
    public class Comment
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("content")]
        [Required]
        [StringLength(1000)]
        public string Content { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [Column("vacation_request_id")]
        public int VacationRequestId { get; set; }
        public VacationRequest VacationRequest { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
