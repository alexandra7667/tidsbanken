namespace Backend.Payloads
{
    public record UpdateRequestPayload(
        string Approved,
        DateTime StartDate,
        DateTime EndDate,
    );
}
