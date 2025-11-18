namespace AMSSystem.Models.DTO
{
    public class LoginResponseDTO
    {
        public string jwttoken { get; set; }

        public string[] Roles { get; set; }
    }
}
