using System.Security.Claims;
using System.Threading.Tasks;
using Backend.DTOs;
using Backend.Models;
using Backend.Payloads;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using backend.Security;
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
            authGroup.MapGet("/{id}", getUserById);
            authGroup.MapPatch("/{id}", updateUser);
            authGroup.MapDelete("/{id}", deleteUser);
            authGroup.MapGet("/{id}/requests", getUserRequests);
            authGroup.MapPost("/{id}/update_password", updatePassword);
        }

        public static async Task<IResult> getAllUsers([FromServices] IUserRepository userRepository)
        {
            IEnumerable<User>? users = await userRepository.GetAllUsers();

            return TypedResults.Ok(users);
        }

        public static async Task<IResult> getUser(
            [FromServices] IUserRepository userRepository,
            ClaimsPrincipal user
        )
        {
            //Returns 303 See Other with the location header set to the URL of the currently authenticated user’s profile
            //Replace JSON request body ClaimsPrincipal user (JWT) with cookie

            string? id = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.Write("user id: " + id);
            string? userRoleString = user.FindFirst(ClaimTypes.Role)?.Value;
            Console.Write("user role: " + userRoleString);

            // Check if the userId and userRoleString are not null
            if (id == null || userRoleString == null)
            {
                return TypedResults.Unauthorized();
            }

            // Convert the userRoleString to Enums.Role
            if (!Enum.TryParse(userRoleString, out Enums.Role userRole))
            {
                return TypedResults.Unauthorized();
            }

            var locationUrl = $"http://localhost:4000/profile/{id}";

            // return Results.Redirect(locationUrl, permanent: false);

            //Return user
            User? foundUser = await userRepository.GetUserById(int.Parse(id));
            UserDTO userDTO = new UserDTO(foundUser);
            return TypedResults.Ok(userDTO);
        }

        public static async Task<IResult> registerUser(
            [FromServices] IUserRepository userRepository,
            ClaimsPrincipal user,
            [FromBody] AddUserPayload payload
        )
        {
            // Debugging logs
            Console.WriteLine("Starting registerUser method");

            // Get the admin ID from the claims
            string? adminIdString = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Console.WriteLine("User: " + user);

            foreach (var claim in user.Claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            }
            Console.WriteLine("Admin ID String: " + adminIdString);

            if (adminIdString == null || !int.TryParse(adminIdString, out int adminId))
            {
                Console.WriteLine("Admin ID is invalid or not provided.");
                return TypedResults.Unauthorized();
            }

            User? adminUser = await userRepository.GetUserById(adminId);
            if (adminUser == null)
            {
                Console.WriteLine("Admin user not found.");
                return TypedResults.NotFound("Admin user not found.");
            }

            if (adminUser.Role != Enums.Role.ADMIN)
            {
                Console.WriteLine("User is not an admin.");
                return TypedResults.Forbid();
            }

            try
            {
                await userRepository.AddUser(payload);
                Console.WriteLine("User registered successfully.");
                return TypedResults.Ok("User registered successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error registering user: {ex.Message}");
                return TypedResults.Problem("Error registering user.");
            }
        }

        public static async Task<IResult> getUserById(
            [FromServices] IUserRepository userRepository,
            int id
        )
        {
            User? user = await userRepository.GetUserById(id);

            if (user == null)
            {
                return TypedResults.NotFound("User not found.");
            }

            UserDTO userDTO = new UserDTO(user);

            return TypedResults.Ok(userDTO);
        }

        public static async Task<IResult> updateUser(
            [FromServices] IUserRepository userRepository,
            [FromBody] UpdatePayload payload,
            int id
        )
        {
            User user = await userRepository.GetUserById(id);

            if (user == null)
            {
                return TypedResults.NotFound("User not found");
            }

            User? updatedUser = null;

            if (payload.Email != null)
            {
                updatedUser = await userRepository.UpdateEmail(user, payload.Email);
            }

            if (payload.Name != null)
            {
                updatedUser = await userRepository.UpdateName(user, payload.Name);
            }

            if (updatedUser == null)
            {
                return TypedResults.BadRequest("User could not be updated.");
            }

            return TypedResults.Ok(new UserDTO(updatedUser));
        }

        public static async Task<IResult> deleteUser(
            [FromServices] IUserRepository userRepository,
            int id
        )
        {
            bool isDeleted = await userRepository.DeleteUser(id);

            if (!isDeleted)
            {
                return TypedResults.NotFound("User not found.");
            }

            return TypedResults.Ok("User deleted successfully.");
        }

        public static async Task<IResult> getUserRequests(
            [FromServices] IUserRepository userRepository,
            int id
        )
        {
            User user = await userRepository.GetUserById(id);

            if (user == null)
            {
                return TypedResults.NotFound("User not found");
            }

            List<VacationRequest> requests = user.VacationRequests;
            List<VacationRequestDTO> vacationRequestDtos = requests
                .Select(vacationRequest => new VacationRequestDTO(vacationRequest))
                .ToList();
            return TypedResults.Ok(vacationRequestDtos);
        }

        public static async Task<IResult> updatePassword(
            [FromServices] IUserRepository userRepository,
            [FromBody] UpdatePasswordPayload payload,
            int id
        )
        {
            User user = await userRepository.GetUserById(id);

            if (user == null)
            {
                return TypedResults.NotFound("User not found");
            }

            string hashedPassword = PasswordHasher.HashPassword(payload.oldPassword);

            if (user.Password != hashedPassword)
            {
                return TypedResults.BadRequest("Old password is incorrect");
            }

            User? updatedUser = await userRepository.UpdatePassword(user, payload.newPassword);

            return TypedResults.Ok("Password updated");
        }
    }
}
