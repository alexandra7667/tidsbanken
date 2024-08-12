using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Repositories
{
    public class commentRepository : ICommentRepository
    {
        public Task<Comment> AddComment(Comment comment)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> GetCommentById(int id)
        {
            throw new NotImplementedException();
        }
    }
}