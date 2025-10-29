using System.ComponentModel.DataAnnotations;

namespace AMSSystem.Models.DTO
{
    public class LoginRequestDTO
    {   
        [Required]
        [DataType(DataType.EmailAddress)]
        public required string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public required string Password { get; set; }
        
    }
}
