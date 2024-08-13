using Backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Backend.Payloads;

namespace Backend.Repositories
{
    public interface IVacationRequestRepository
    {
        Task<VacationRequest?> GetRequestById(int id);
        Task<IEnumerable<VacationRequest>> GetAllRequests();
        Task<VacationRequest> AddRequest(AddVacationRequestPayload request);
        Task<bool> ApproveRequest(int id);
        Task<bool> DeleteRequest(int id);
    }
}
