using Backend.Models;
using System.Threading.Tasks;
using System.Collections.Generic;
using Backend.Payloads;

namespace Backend.Repositories
{
    public interface IVacationRequestRepository
    {
        Task<IEnumerable<VacationRequest>> GetAllRequests();
        Task<VacationRequest> AddRequest(AddVacationRequestPayload request);
        Task<VacationRequest?> GetRequestById(int requestId);
        Task<VacationRequest?> ApproveRequest(UpdateRequestPayload payload, int requestId);
        Task<VacationRequest?> UpdateRequest(UpdateRequestPayload payload, int requestId);
        Task<bool> DeleteRequest(int requestId);
    }
}