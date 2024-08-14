namespace Backend.Payloads
{
    public record UpdatePasswordPayload(string oldPassword, string newPassword);
}
