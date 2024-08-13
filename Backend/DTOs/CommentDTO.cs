using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;

namespace Backend.DTOs

public class CommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int VacationRequestId { get; set; }
        public int UserId { get; set; }


        public CommentDTO(Comment comment)
        {
            Id = comment.Id;
            Content = comment.Content;
            VacationRequestId = comment.VacationRequestId;
            UserId = comment.UserId;
        }
    }