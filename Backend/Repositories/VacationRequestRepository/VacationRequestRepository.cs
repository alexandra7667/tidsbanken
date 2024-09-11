using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Models;
using Backend.Payloads;
using Backend.Enums;
using Microsoft.EntityFrameworkCore;

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

            //the out keyword is used to indicate that a parameter is being passed by reference (not a copy) and will be assigned a value inside the method
            if (Enum.TryParse(payload.Approved, out VacationRequestState result))
            {
                request.IsApproved = result;
                //When a request is successfully moderated by an administrator, the moderator and the time of moderation should be recorded on the request object
                request.UpdatedAt = DateTime.UtcNow;
            }
            else
            {
                return false;
            }

            _databaseContext.VacationRequests.Update(request);

            await _databaseContext.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateRequest(UpdateRequestPayload payload, int requestId)
        {
            var request = await _databaseContext.VacationRequests.FindAsync(requestId);

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
