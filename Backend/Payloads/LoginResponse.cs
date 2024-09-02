namespace Backend.Payloads
{
    public record LoginResponse(string token, UserDTO userDTO);
}
