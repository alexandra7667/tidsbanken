using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface IIneligibleRepository
    {
        public Task<IEnumerable<IneligiblePeriod>?> GetAllIneligibles();
        public Task<IneligiblePeriod> AddIneligible(AddIneligiblePayload payload);
        public Task<IneligiblePeriod?> GetIneligibleById(int periodId);
        public Task<IneligiblePeriod?> UpdateIneligible(int periodId, UpdateIneligiblePayload payload);
        public Task<bool> DeleteIneligible(int periodId);
        
        public Task<bool> SetMaxVacationDays(SettingsPayload payload); //From Settings controller
    }
}