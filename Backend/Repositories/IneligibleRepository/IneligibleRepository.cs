using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
namespace backend.Repositories
{
    public class ineligibleRepository : IIneligibleRepository
    {
        public Task<IEnumerable<IneligiblePeriod>?> GetAllIneligibles();
        {
            throw new NotImplementedException();
        }

        public Task<IneligiblePeriod> AddIneligible(AddIneligiblePayload payload);
        {
            throw new NotImplementedException();
        }

        public Task<IneligiblePeriod?> GetIneligibleById(int periodId);
        {
            throw new NotImplementedException();
        }

        public Task<IneligiblePeriod?> UpdateIneligible(int periodId, UpdateIneligiblePayload payload);
        {
            throw new NotImplementedException();
        }

        public Task<IneligiblePeriod?> DeleteIneligible(int periodId);
        {
            throw new NotImplementedException();
        }

        public Task<IneligiblePeriod?> SetMaxVacationDays(SettingsPayload payload);
        {
            throw new NotImplementedException();
        }
    }
}