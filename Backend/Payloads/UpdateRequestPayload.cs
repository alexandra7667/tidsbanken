namespace Backend.Payloads
{
    public record UpdateRequestPayload(
        bool approved,
        string startDate,
        string endDate,
        string title
    );
}
