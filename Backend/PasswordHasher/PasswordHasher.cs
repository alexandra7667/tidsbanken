using System;
using System.Security.Cryptography;
using System.Text;

namespace backend.Security
{
    public class PasswordHasher
    {
        public static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password); //Turn the password string into an array of bytes
                byte[] hashBytes = sha256.ComputeHash(passwordBytes); //Use algorithm to hash the byte array
                StringBuilder sb = new StringBuilder();
                
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("x2"));
                }
                return sb.ToString();
            }
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {
            string hashedInput = HashPassword(password);
            return String.Equals(hashedInput, hashedPassword);
        }
    }
}