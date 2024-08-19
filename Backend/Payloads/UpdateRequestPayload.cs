namespace Backend.Payloads
{
    public record UpdateRequestPayload(
        bool Approved,
        DateTime StartDate,
        DateTime EndDate,
        string title
    );
}
