using Backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Backend.Repositories
{
    public interface IVacationRequestRepository
    {
        Task<VacationRequest?> GetRequestById(int id);
        Task<IEnumerable<VacationRequest>> GetAllRequests();
        Task AddRequest(VacationRequest request);
        Task<bool> ApproveRequest(int id);
        Task<bool> DeleteRequest(int id);
    }
}
