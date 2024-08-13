using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface ICommentRepository
    {
        public Task<Comment> AddComment(AddCommentPayload comment);
        public Task<Comment?> GetCommentById(int id);
    }
}