using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
namespace Backend.Controllers
{
    public static class IneligibleApi
    {
        public static void ConfigureIneligibleApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("ineligible");
            authGroup.MapGet("/", getAllIneligibles);
            authGroup.MapPost("/", createIneligible);
            authGroup.MapGet("/{periodId}", getIneligibleById);
            authGroup.MapPatch("/{periodId}", updateIneligible);
            authGroup.MapDelete("/{periodId}", deleteIneligible);
        }

        public static async Task<IResult> getAllIneligibles([FromServices] IIneligibleRepository ineligibleRepository)
        {

            return TypedResults.Ok();
        }

        public static async Task<IResult> createIneligible([FromServices] IIneligibleRepository ineligibleRepository, [FromBody] AddIneligiblePeriodPayload payload, ClaimsPrincipal user)
        {
            //Admin only
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }

            return TypedResults.Ok();
        }

        public static async Task<IResult> getIneligibleById([FromServices] IIneligibleRepository ineligibleRepository)
        {
            
            return TypedResults.Ok();
        }

        public static async Task<IResult> updateIneligible([FromServices] IIneligibleRepository ineligibleRepository, [FromBody] UpdateIneligiblePeriodPayload payload, ClaimsPrincipal user)
        {
            //Admin only
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }
            
            return TypedResults.Ok();
        }

        public static async Task<IResult> deleteIneligible([FromServices] IIneligibleRepository ineligibleRepository, ClaimsPrincipal user)
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
