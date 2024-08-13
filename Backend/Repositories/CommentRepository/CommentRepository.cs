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
        public Task<Comment> AddComment(AddCommentPayload comment)
        {
            throw new NotImplementedException();
        }

        public Task<Comment?> GetCommentById(int id)
        {
            throw new NotImplementedException();
        }
    }
}