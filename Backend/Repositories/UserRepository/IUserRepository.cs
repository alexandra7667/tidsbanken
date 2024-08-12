using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface IUserRepository
    {
        public Task<User?> GetUserById(int Userid);
        public Task<User?> AddUser(User user);
        public Task<IEnumerable<User>?> GetAllUsers();
        public Task<bool> DeleteUser(int Userid);

        public Task<User?> AuthenticateUser(LoginPayload loginRequest);
    }
}