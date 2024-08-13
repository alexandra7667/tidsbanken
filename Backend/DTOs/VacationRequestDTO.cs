using System.ComponentModel.DataAnnotations.Schema;
using Backend.Data;
using Backend.Models;
using Backend.Enums;
namespace Backend.DTOs{
public class VacationRequestDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Description { get; set; }
        public VacationRequestState IsApproved { get; set; }
        public int UserId { get; set; }

        public VacationRequestDTO(VacationRequest vacationRequest)
        {
            Id = vacationRequest.Id;
            StartDate = vacationRequest.StartDate;
            EndDate = vacationRequest.EndDate;
            Description = vacationRequest.Description;
            IsApproved = vacationRequest.IsApproved;
            UserId = vacationRequest.UserId;
        }
    }
}

