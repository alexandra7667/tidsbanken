using Microsoft.AspNetCore.Mvc;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Models;
namespace Backend.Controllers
{
    public static class AdminApi
    {
        public static void ConfigureAdminApi(this WebApplication app)
        {
            var adminGroup = app.MapGroup("admin");
            adminGroup.MapGet("/users", getAllUsers);
            adminGroup.MapDelete("/user/{id}", deleteUserById);
        }

        public static async Task<IResult> getAllUsers([FromServices] IUserRepository userRepository)
        {
            var users = await userRepository.GetAllUsers();
            return TypedResults.Ok(users);
        }


        public static async Task<IResult> registerUser([FromServices] IUserRepository userRepository, [FromBody] User user)
        {
            // Add user registration logic here
            await userRepository.AddUser(user);
            return TypedResults.Ok("User registered successfully.");
        }

        public static async Task<IResult> deleteUserById([FromServices] IUserRepository userRepository, int id)
        {
            bool isDeleted = await userRepository.DeleteUser(id);

            if (!isDeleted)
            {
                return TypedResults.NotFound("User not found.");
            }

            return TypedResults.Ok("User deleted successfully.");
        }
    }
}
