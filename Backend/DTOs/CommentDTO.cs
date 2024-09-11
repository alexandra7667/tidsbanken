using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;
using Backend.Models;
namespace Backend.DTOs
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int VacationRequestId { get; set; }
        public int UserId { get; set; }
        public string CreatedAt { get; set; }


        public CommentDTO(Comment comment)
        {
            Id = comment.Id;
            Content = comment.Content;
            VacationRequestId = comment.VacationRequestId;
            UserId = comment.UserId;
            CreatedAt = comment.CreatedAt.ToString();
        }
    }
}

