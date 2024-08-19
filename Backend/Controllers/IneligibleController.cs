using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
using System.Security.Claims;

namespace Backend.Controllers
{
    public static class IneligibleApi
    {
        public static void ConfigureIneligibleApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("ineligible");
            authGroup.MapGet("/", getAllIneligibles);
            authGroup.MapPost("/", createIneligible);
            authGroup.MapGet("/{ipId}", getIneligibleById);
            authGroup.MapPatch("/{ipId}", updateIneligible);
            authGroup.MapDelete("/{ipId}", deleteIneligible);
        }

        public static async Task<IResult> getAllIneligibles([FromServices] IIneligibleRepository ineligibleRepository)
        {

            return TypedResults.Ok();
        }

        public static async Task<IResult> createIneligible([FromServices] IIneligibleRepository ineligibleRepository, [FromBody] AddIneligiblePayload payload, ClaimsPrincipal user)
        {
            //Admin only
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }

            return TypedResults.Ok();
        }

        public static async Task<IResult> getIneligibleById([FromServices] IIneligibleRepository ineligibleRepository, int ipId)
        {
            
            return TypedResults.Ok();
        }

        public static async Task<IResult> updateIneligible([FromServices] IIneligibleRepository ineligibleRepository, [FromBody] UpdateIneligiblePayload payload, ClaimsPrincipal user, int ipId)
        {
            //Admin only
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }
            
            return TypedResults.Ok();
        }

        public static async Task<IResult> deleteIneligible([FromServices] IIneligibleRepository ineligibleRepository, ClaimsPrincipal user, int ipId)
        {
            //Admin only
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }
            
            return TypedResults.Ok();
        }
    }
}
