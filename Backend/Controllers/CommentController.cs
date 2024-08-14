using System.Threading.Tasks;
using Backend.Models;
using Backend.Payloads;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public static class CommentApi
    {
        public static void ConfigureCommentApi(this WebApplication app)
        {
            var requestGroup = app.MapGroup("comment"); //Should be request (specified in case description) but for ease separated into its own controller
            requestGroup.MapGet("/{requestId}/comment", getAllComments); //Comments for a request may only be viewed by an Administrator or the request owner
            requestGroup.MapPost("/{requestId}/comment", createComment); //Only Administrators and the request owner may create comments on a particular request.
            requestGroup.MapGet("/{requestId}/comment/{commentId}", getCommentById); //Comments for a request may only be viewed by an Administrator or the request owner
            requestGroup.MapPatch("/{requestId}/comment/{commentId}", updateComment); //Comments may only be edited by the comment author and only within the first 24hours since created.
            requestGroup.MapDelete("/{requestId}/comment/{commentId}", deleteComment); //Within the first 24 hours after having made the comment, the comment author may delete their own comments.
        }

        public static async Task<IResult> getAllComments(
            [FromServices] ICommentRepository commentRepository,
            int requestId
        )
        {
            IEnumerable<Comment>? allComments = await commentRepository.GetAllRequests();

            if (allComments == null)
            {
                return TypedResults.NotFound("Comments not found.");
            }

            //Turn list of model objects into list of DTOs
            List<CommentDTO> commentDTOs = allComments
                .Select(comment => new CommentDTO(comment))
                .ToList();

            return TypedResults.Ok(commentDTOs);
        }

        public static async Task<IResult> createComment(
            [FromServices] ICommentRepository commentRepository,
            [FromBody] AddCommentPayload payload,
            int requestId
        )
        {
            await requestRepository.AddComment(requestId, payload);

            return TypedResults.Ok("Comment created successfully.");
        }

        public static async Task<IResult> getCommentById(
            [FromServices] ICommentRepository commentRepository,
            int requestId,
            int commentId
        )
        {
            Comment? comment = await commentRepository.getCommentById(requestId, commentId);

            if (comment == null)
            {
                return TypedResults.NotFound("Comment not found.");
            }

            CommentDTO commentDTO = new CommentDTO(comment);

            return TypedResults.Ok(commentDTO);
        }

        public static async Task<IResult> updateComment(
            [FromServices] ICommentRepository commentRepository,
            [FromBody] UpdateCommentPayload payload,
            int requestId,
            int commentId,
            ClaimsPrincipal user
        )
        {
            /*
            Comments may only be edited by the comment author and only within the first 24
            hours since they were created. Comments that have been edited should show that they
            have been edited and provide a timestamp of when they were created and last edited.
            */
            await commentRepository.UpdateComment(requestId, commentId, payload);

            return TypedResults.Ok("The comment was updated");
        }

        public static async Task<IResult> deleteComment(
            [FromServices] ICommentRepository commentRepository,
            int requestId,
            int commentId,
            ClaimsPrincipal user
        )
        {
            //Within the first 24 hours after having made the comment, the comment author may
            //delete their own comments. Administrators are subject to these same restrictions.
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }

            await commentRepository.DeleteComment(requestId, commentId);

            return TypedResults.Ok("The comment was deleted");
        }
    }
}
