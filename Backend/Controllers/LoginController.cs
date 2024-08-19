using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
using Backend.DTOs;
namespace Backend.Controllers
{
    public static class LoginApi
    {
        public static void ConfigureLoginApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("login");
            authGroup.MapPost("/", login);
        }

        public static async Task<IResult> login([FromServices] IUserRepository userRepository, [FromBody] LoginPayload loginRequest)
        {
            User? user = await userRepository.AuthenticateUser(loginRequest);

            if (user == null)
            {
                return TypedResults.Unauthorized();
            }

            UserDTO userDTO = new UserDTO(user);

            return TypedResults.Ok(userDTO);
        }
    }
}