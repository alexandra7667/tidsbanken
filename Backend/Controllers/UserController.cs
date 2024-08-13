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
            authGroup.MapGet("/", getUser);
            authGroup.MapPost("/", registerUser);
            authGroup.MapGet("/id", getUserById);
            authGroup.MapPatch("/id", updateEmail);
            authGroup.MapDelete("/id", deleteUser);
            authGroup.MapGet("/id/requests", getUserRequests);
            authGroup.MapPost("/id/update_password", updatePassword);
        }

        public static async Task<IResult> getUser([FromServices] IUserRepository userRepository, [FromBody] ClaimsPrincipal user)
        {
            //Ska bara kolla vad det här är
            foreach (Claim claim in user.Claims) {
                Response.Write("CLAIM TYPE: " + claim.Type + "; CLAIM VALUE: " + claim.Value + "</br>");
            }

            //Returns 303 See Other with the location header set to the URL of the currently authenticated user’s profile
            //Replace JSON request body ClaimsPrincipal user (JWT) with cookie 

            string userId = user.UserId();
            string userRole = user.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "ADMIN")
            {
                return TypedResults.Unauthorized();
            }

            var locationUrl = $"http://localhost:4000/profile/{userId}";

            return Results.Redirect(locationUrl, permanent: false, statusCode: 303);
        }

        public static async Task<IResult> registerUser([FromServices] IUserRepository userRepository, [FromBody] AddUserPayload payload, int adminId)
        {
            //Only admin can register a new user
            User? user = await userRepository.GetUserById(adminId);

            if(user == null) {
                return TypedResults.NotFound("User not found.");
            }
            if(user.role !== Role.ADMIN) {
                return TypedResults.Forbid("User is not admin.");
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

            User? updatedUser = await userRepository.UpdateEmail(user, payload.email);

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

            if (user == null) {
                return TypedResults.NotFound("User not found");
            }

            if (user.password != payload.oldPassword) {
                return TypedResults.BadRequest("Old password is incorrect");
            }

            User? updatedUser = await userRepository.UpdatePassword(user, payload.newPassword);

            return TypedResults.Ok("Password updated");
        }
    }
}
