using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;
using Backend.Models;
using Backend.Enums;

namespace Backend.DTOs
{
    public class IneligiblePeriodDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public IneligiblePeriodDTO(IneligiblePeriod ineligiblePeriod)
        {
            Id = ineligiblePeriod.Id;
            StartDate = ineligiblePeriod.StartDate;
            EndDate = ineligiblePeriod.EndDate;
        }
    }
}
