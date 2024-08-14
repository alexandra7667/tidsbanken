using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface IUserRepository
    {
        public Task<User?> GetUserById(int UserId);
        public Task<User?> AddUser(AddUserPayload payload); //aka RegisterUser
        public Task<User?> AuthenticateUser(LoginPayload loginRequest); //aka Login from LoginController
        public Task<IEnumerable<User>?> GetAllUsers();
        public Task<bool> DeleteUser(int UserId);
        public Task<User?> UpdatePassword(User user, string newPassword);
        public Task<User?> UpdateEmail(User user, string newEmail);
    }
}