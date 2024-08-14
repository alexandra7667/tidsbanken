using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
namespace backend.Repositories
{
    public class commentRepository : ICommentRepository
    {
        public Task<IEnumerable<Comment>?> GetAllComments(int requestId)
        {
            throw new NotImplementedException();
        }

        public Task<Comment> AddComment(AddCommentPayload payload)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> GetCommentById(int requestId, int commentId)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> UpdateComment(int requestId, int commentId, UpdateCommentPayload payload);
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> DeleteComment(int requestId, int commentId);
        {
            throw new NotImplementedException();
        }
    }
}