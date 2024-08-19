using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface IIneligibleRepository
    {
        public Task<IEnumerable<IneligiblePeriod>?> GetAllIneligibles();
        public Task<IneligiblePeriod> AddIneligible(AddIneligiblePayload payload);
        public Task<IneligiblePeriod?> GetIneligibleById(int ipId);
        public Task<IneligiblePeriod?> UpdateIneligible(int ipId, UpdateIneligiblePayload payload);
        public Task<IneligiblePeriod?> DeleteIneligible(int ipId);
    }
}