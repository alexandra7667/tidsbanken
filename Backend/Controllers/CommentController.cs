using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
namespace Backend.Controllers
{
    public static class CommentApi
    {
        public static void ConfigureCommentApi(this WebApplication app)
        {
            var commentGroup = app.MapGroup("comment");
            commentGroup.MapPost("/add", addComment);
            commentGroup.MapGet("/{id}", getCommentById);
        }

        public static async Task<IResult> addComment([FromServices] ICommentRepository commentRepository, [FromBody] AddCommentPayload comment)
        {
            // Add logic to add a comment
            await commentRepository.AddComment(comment);
            return TypedResults.Ok("Comment added successfully.");
        }

        public static async Task<IResult> getCommentById([FromServices] ICommentRepository commentRepository, int id)
        {
            Comment? comment = await commentRepository.GetCommentById(id);

            if (comment == null)
            {
                return TypedResults.NotFound("Comment not found.");
            }

            return TypedResults.Ok(comment);
        }
    }
}
