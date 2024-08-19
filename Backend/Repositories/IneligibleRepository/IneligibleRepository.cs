using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
using Microsoft.EntityFrameworkCore;
namespace backend.Repositories
{
    public class IneligibleRepository : IIneligibleRepository
    {
        private Context _databaseContext;

        public IneligibleRepository(Context databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<IEnumerable<IneligiblePeriod>?> GetAllIneligibles()
        {
            return await _databaseContext.IneligiblePeriods.ToListAsync();
        }

        public async Task<IneligiblePeriod> AddIneligible(AddIneligiblePayload payload)
        {
            DateTime ca = DateTime.UtcNow;

            var ineligiblePeriod = new IneligiblePeriod
            {
                StartDate = payload.StartDate,
                EndDate = payload.EndDate,
                CreatedAt = ca,
                UpdatedAt = ca,
            };

            await _databaseContext.IneligiblePeriods.AddAsync(ineligiblePeriod);

            await _databaseContext.SaveChangesAsync();

            return ineligiblePeriod;
        }

        public async Task<IneligiblePeriod?> GetIneligibleById(int ipId)
        {
            var ineligiblePeriod = await _databaseContext.IneligiblePeriods.FirstOrDefaultAsync(ip => ip.Id == ipId);

            return ineligiblePeriod;
        }

        public async Task<IneligiblePeriod?> UpdateIneligible(int ipId, UpdateIneligiblePayload payload)
        {
            IneligiblePeriod? ineligiblePeriod = await _databaseContext.IneligiblePeriods.FindAsync(ipId);

            ineligiblePeriod.StartDate = payload.StartDate;
            ineligiblePeriod.EndDate = payload.EndDate;

            await _databaseContext.SaveChangesAsync();

            return ineligiblePeriod;
        }

        public async Task<IneligiblePeriod?> DeleteIneligible(int ipId)
        {
            IneligiblePeriod ineligiblePeriod = await _databaseContext.IneligiblePeriods.FindAsync(ipId);

            _databaseContext.IneligiblePeriods.Remove(ineligiblePeriod);

            await _databaseContext.SaveChangesAsync();

            return ineligiblePeriod;
        }

    }
}