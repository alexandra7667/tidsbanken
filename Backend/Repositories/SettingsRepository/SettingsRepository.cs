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
        private DatabaseContext _databaseContext;

        public VacationRequestRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Task<bool> SetMaxVacationDays(SettingsPayload payload);
        {
            //Find the only setting in the table
            var setting = await _databaseContext.Settings.FirstOrDefaultAsync();

            setting.MaxDays = payload.MaxDays;

            await _databaseContext.Settings.AddAsync(setting);

            await _databaseContext.SaveChangesAsync();

            return setting;
        }
    }
}