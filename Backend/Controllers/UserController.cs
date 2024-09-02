using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Repositories;
using System.Threading.Tasks;
using Backend.Payloads;
using System.Security.Claims;
using Backend.DTOs;
namespace Backend.Controllers
{
    public static class UserApi
    {
        public static void ConfigureUserApi(this WebApplication app)
        {
            var authGroup = app.MapGroup("user");
            authGroup.MapGet("/", getUser);
            authGroup.MapGet("/allUSers", getAllUsers); //remove later, only for debugging
            authGroup.MapPost("/", registerUser);
            authGroup.MapGet("/id", getUserById);
            authGroup.MapPatch("/id", updateEmail);
            authGroup.MapDelete("/id", deleteUser);
            authGroup.MapGet("/id/requests", getUserRequests);
            authGroup.MapPost("/id/update_password", updatePassword);
        }

        public static async Task<IResult> getAllUsers([FromServices] IUserRepository userRepository){
            IEnumerable<User>? users = await userRepository.GetAllUsers();

            return TypedResults.Ok(users);
        }

        public static async Task<IResult> getUser([FromServices] IUserRepository userRepository, ClaimsPrincipal user)
        {
            //Ska bara kolla vad det här är
            foreach (Claim claim in user.Claims)
            {
                Console.Write("CLAIM TYPE: " + claim.Type + "; CLAIM VALUE: " + claim.Value + "</br>");
            }

            //Returns 303 See Other with the location header set to the URL of the currently authenticated user’s profile
            //Replace JSON request body ClaimsPrincipal user (JWT) with cookie 

            string? userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.Write("user id: " + userId);
            string? userRoleString = user.FindFirst(ClaimTypes.Role)?.Value;
            Console.Write("user role: " + userRoleString);


            // Check if the userId and userRoleString are not null
            if (userId == null || userRoleString == null)
            {
                return TypedResults.Unauthorized();
            }

            // Convert the userRoleString to Enums.Role
            if (!Enum.TryParse(userRoleString, out Enums.Role userRole))
            {
                return TypedResults.Unauthorized();
            }

            // Check if the userRole is not ADMIN
            if (userRole != Enums.Role.ADMIN)
            {
                return TypedResults.Unauthorized();
            }

            var locationUrl = $"http://localhost:4000/profile/{userId}";

            return Results.Redirect(locationUrl, permanent: false);
        }
        public static async Task<IResult> registerUser([FromServices] IUserRepository userRepository, ClaimsPrincipal user, [FromBody] AddUserPayload payload)
        {
            // Get the admin ID from the claims
            string? adminIdString = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (adminIdString == null || !int.TryParse(adminIdString, out int adminId))
            {
                return TypedResults.Unauthorized();
            }

            User? adminUser = await userRepository.GetUserById(adminId);

            if (adminUser == null)
            {
                return TypedResults.NotFound("Admin user not found.");
            }

            if (adminUser.Role != Enums.Role.ADMIN)
            {
                return TypedResults.Forbid();
            }

            await userRepository.AddUser(payload);
            return TypedResults.Ok("User registered successfully.");
        }

        public static async Task<IResult> getUserById([FromServices] IUserRepository userRepository, int userId)
        {
            User? user = await userRepository.GetUserById(userId);

            if (user == null)
            {
                return TypedResults.NotFound("User not found.");
            }

            UserDTO userDTO = new UserDTO(user);

            return TypedResults.Ok(userDTO);
        }

        public static async Task<IResult> updateEmail([FromServices] IUserRepository userRepository, [FromBody] UpdateEmailPayload payload, int userId)
        {
            User user = await userRepository.GetUserById(userId);

            if (user == null)
            {
                return TypedResults.NotFound("User not found");
            }

            User? updatedUser = await userRepository.UpdateEmail(user, payload.Email);

            return TypedResults.Ok(new UserDTO(updatedUser));
        }

        public static async Task<IResult> deleteUser([FromServices] IUserRepository userRepository, int userId)
        {
            bool isDeleted = await userRepository.DeleteUser(userId);

            if (!isDeleted)
            {
                return TypedResults.NotFound("User not found.");
            }

            return TypedResults.Ok("User deleted successfully.");
        }

        public static async Task<IResult> getUserRequests([FromServices] IUserRepository userRepository, int userId)
        {
            User user = await userRepository.GetUserById(userId);

            if (user == null)
            {
                return TypedResults.NotFound("User not found");
            }

            List<VacationRequest> requests = user.VacationRequests;
            List<VacationRequestDTO> vacationRequestDtos = requests.Select(vacationRequest => new VacationRequestDTO(vacationRequest)).ToList();

            return TypedResults.Ok(vacationRequestDtos);
        }

        public static async Task<IResult> updatePassword([FromServices] IUserRepository userRepository, [FromBody] UpdatePasswordPayload payload, int userId)
        {
            User user = await userRepository.GetUserById(userId);

            if (user == null)
            {
                return TypedResults.NotFound("User not found");
            }

            if (user.Password != payload.oldPassword)
            {
                return TypedResults.BadRequest("Old password is incorrect");
            }

            User? updatedUser = await userRepository.UpdatePassword(user, payload.newPassword);

            return TypedResults.Ok("Password updated");
        }
    }
}
