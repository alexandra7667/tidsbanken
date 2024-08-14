namespace Backend.Payloads
{
    public record AddCommentPayload(int VacationRequestId, int UserId, string Content);
}
