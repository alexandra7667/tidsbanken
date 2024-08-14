using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface ICommentRepository
    {
        public Task<IEnumerable<Comment>?> GetAllComments(int requestId);
        public Task<Comment> AddComment(int requestId, AddCommentPayload payload);
        public Task<Comment?> GetCommentById(int requestId, int commentId);
        public Task<Comment?> UpdateComment(int requestId, int commentId, UpdateCommentPayload payload);
        public Task<bool> DeleteComment(int requestId, int commentId);
    }
}