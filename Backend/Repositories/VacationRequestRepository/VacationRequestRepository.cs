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
        private readonly Context _context;
        private readonly IUserRepository _userRepository;

        public VacationRequestRepository(Context context, IUserRepository userRepository)
        {
            _context = context;
            _userRepository = userRepository;

        }

        public async Task<VacationRequest?> GetRequestById(int id)
        {
            return await _context.VacationRequests.FindAsync(id);
        }

        public async Task<IEnumerable<VacationRequest>> GetAllRequests()
        {
            return await _context.VacationRequests.ToListAsync();
        }

        public async Task<VacationRequest> AddRequest(AddVacationRequestPayload payload)
        {
            if(_userRepository.GetUserById(payload.UserId) == null)
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

            await _context.VacationRequests.AddAsync(request);
            await _context.SaveChangesAsync();

            return request;
        }

        public async Task<bool> ApproveRequest(int id)
        {
            var request = await _context.VacationRequests.FindAsync(id);
            if (request == null)
            {
                return false;
            }

            request.IsApproved = Enums.VacationRequestState.APPROVED;
            _context.VacationRequests.Update(request);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRequest(int id)
        {
            var request = await _context.VacationRequests.FindAsync(id);
            if (request == null)
            {
                return false;
            }

            _context.VacationRequests.Remove(request);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
