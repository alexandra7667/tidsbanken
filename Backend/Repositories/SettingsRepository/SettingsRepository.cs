using Backend.Models;
using Backend.Data;
using Backend.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Payloads;
using  Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class SettingsRepository : ISettingsRepository
    {
        private Context _databaseContext;

        public SettingsRepository(Context databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<bool> SetMaxVacationDays(SettingsPayload payload)
        {
            //Find the only setting in the table
            Setting? setting = await _databaseContext.Settings.FirstOrDefaultAsync();

            setting.MaxDays = payload.MaxDays;

            await _databaseContext.Settings.AddAsync(setting);

            await _databaseContext.SaveChangesAsync();

            return true;
        }
    }
}