using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Data;
namespace Backend.Repositories
{
    public class VacationRequestRepository : IVacationRequestRepository
    {
        private readonly Context _context;

        public VacationRequestRepository(Context context)
        {
            _context = context;
        }

        public async Task<VacationRequest?> GetRequestById(int id)
        {
            return await _context.VacationRequests.FindAsync(id);
        }

        public async Task<IEnumerable<VacationRequest>> GetAllRequests()
        {
            return await _context.VacationRequests.ToListAsync();
        }

        public async Task AddRequest(VacationRequest request)
        {
            await _context.VacationRequests.AddAsync(request);
            await _context.SaveChangesAsync();
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
