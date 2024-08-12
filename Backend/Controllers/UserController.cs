using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
namespace Backend.Controllers
{
    public static class UserApi
    {
        public static void ConfigureUserApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("user");
            authGroup.MapGet("/id", getUserById);
            authGroup.MapPost("/login", loginUser);
        }

        public static async Task<IResult> getUserById([FromServices] IUserRepository userRepository, int userId)
        {
            User? user = await userRepository.GetUserById(userId);

            if (user == null)
            {
                return TypedResults.NotFound("User not found.");
            }

            return TypedResults.Ok(user);
        }

        public static async Task<IResult> loginUser([FromServices] IUserRepository userRepository, [FromBody] LoginPayload loginRequest)
        {
            // Add login logic here
            User? user = await userRepository.AuthenticateUser(loginRequest);
            if (user == null)
            {
                return TypedResults.Unauthorized();
            }

            return TypedResults.Ok(user);
        }
    }
}
