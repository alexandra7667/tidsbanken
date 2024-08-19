using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Payloads;
namespace Backend.Repositories
{
    public class VacationRequestRepository : IVacationRequestRepository
    {
        private Context _databaseContext;
        private readonly IUserRepository _userRepository;

        public VacationRequestRepository(Context databaseContext, IUserRepository userRepository)
        {
            _databaseContext = databaseContext;
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<VacationRequest>> GetAllRequests()
        {
            return await _databaseContext.VacationRequests.ToListAsync();
        }

        public async Task<VacationRequest> AddRequest(AddVacationRequestPayload payload)
        {
            if (_userRepository.GetUserById(payload.UserId) == null)
            {
                return null;
            }

            if (payload.StartDate > payload.EndDate)
            {
                //kan inte avsluta semestern innan den börjat
                return null;
            }

            VacationRequest request = new VacationRequest
            {
                UserId = payload.UserId,
                StartDate = payload.StartDate,
                EndDate = payload.EndDate,
                Description = payload.Description,
                IsApproved = Enums.VacationRequestState.PENDING,
            };

            await _databaseContext.VacationRequests.AddAsync(request);

            await _databaseContext.SaveChangesAsync();

            return request;
        }

        public async Task<VacationRequest?> GetRequestById(int requestId)
        {
            return await _databaseContext.VacationRequests.FindAsync(requestId);
        }

        public async Task<bool> ApproveRequest(UpdateRequestPayload payload, int requestId)
        {
            var request = await _databaseContext.VacationRequests.FindAsync(requestId);

            if (request == null)
            {
                return false;
            }

            request.IsApproved = payload.Approved ? Enums.VacationRequestState.APPROVED : Enums.VacationRequestState.DENIED;

            _databaseContext.VacationRequests.Update(request);

            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateRequest(UpdateRequestPayload payload, int requestId)
        {
            var request = await _databaseContext.VacationRequests.FindAsync(requestId);

            if (request == null)
            {
                return false;
            }

            request.StartDate = payload.StartDate;
            request.EndDate = payload.EndDate;

            _databaseContext.VacationRequests.Update(request);

            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteRequest(int requestId)
        {
            var request = await _databaseContext.VacationRequests.FindAsync(requestId);

            if (request == null)
            {
                return false;
            }

            _databaseContext.VacationRequests.Remove(request);
            
            await _databaseContext.SaveChangesAsync();

            return true;
        }
    }
}
