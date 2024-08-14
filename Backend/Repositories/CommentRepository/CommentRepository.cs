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
        private DatabaseContext _databaseContext;

        public CommentRepository(DatabaseContext databaseContext){
            _databaseContext = databaseContext;
        }


        //@TODO: First find the right request and then search for comment among that request's comments OR remove int requestId from params


        public Task<IEnumerable<Comment>?> GetAllComments(int requestId)
        {
            return await _databaseContext.Comments.ToListAsync();
        }

        public Task<Comment> AddComment(AddCommentPayload payload)
        {
            DateTime ca = DateTime.UtcNow;

            var comment = new Comment
            {
                Content = payload.Content;
                VacationRequestId = payload.VacationRequestId;
                UserId = payload.UserId;
                CreatedAt = ca;
                UpdatedAt = ca;
            };

            await _databaseContext.Comments.AddAsync(comment);

            await _databaseContext.SaveChangesAsync();

            return comment;
        }

        public Task<Comment?> GetCommentById(int requestId, int commentId)
        {
            var comment = await _databaseContext.Comments.FirstOrDefaultAsync(c => c.Id == commentId);

            return comment;
        }

        public Task<Comment?> UpdateComment(int requestId, int commentId, UpdateCommentPayload payload);
        {
            var comment = await _databaseContext.Comments.FindAsync(commentId);

            comment.Content = payload.Content;

            await _databaseContext.SaveChangesAsync();

            return comment;
        }

        public Task<bool> DeleteComment(int requestId, int commentId);
        {
            var comment = await _databaseContext.Comments.FindAsync(commentId);

            _databaseContext.Comments.Remove(comment);

            await _databaseContext.SaveChangesAsync();

            return true;
        }
    }
}