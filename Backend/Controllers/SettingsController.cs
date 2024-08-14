using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
namespace Backend.Controllers
{
    public static class SettingsApi
    {
        public static void ConfigureSettingsApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("settings");
            authGroup.MapPost("/", settings);
        }

        public static async Task<IResult> settings([FromServices] IIneligibleRepository ineligibleRepository, ClaimsPrincipal user, [FromBody] SettingsPayload payload)
        {
            //Admin only
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }

            //Specify the maximum period of time any single vacation may be (in days).
            
            //Specify in Ineligible repository
            await ineligibleRepository.SetMaxVacationDays(payload);

            return TypedResults.Ok();
        }
    }
}