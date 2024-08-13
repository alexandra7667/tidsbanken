
namespace Backend.Payloads
{
    public record AddVacationRequestPayload(int UserId, DateTime StartDate, DateTime EndDate, string Description);

}