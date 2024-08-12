using Backend.Models;
namespace Backend.Repositories
{
    public interface ICommentRepository
    {
        public Task<Comment> AddComment(Comment comment);
        public Task<Comment?> GetCommentById(int id);
    }
}