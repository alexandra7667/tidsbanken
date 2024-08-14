using Backend.Models;
using Backend.Payloads;
namespace Backend.Repositories
{
    public interface ISettingsRepository
    {
        public Task<bool> SetMaxVacationDays(SettingsPayload payload);
    }
}