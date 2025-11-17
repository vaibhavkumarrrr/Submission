
// AMSSystem.Models.DTO/BankUserDTO.cs
namespace AMSSystem.Models.DTO
{
    public class BankUserDTO
    {
        public int UserId { get; set; }     
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public DateTime? Dateofbirth { get; set; }

        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
    }

    public class CreateBankUserDTO
    {
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public DateTime? Dateofbirth { get; set; }
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;
    }

    public class UpdateBankUserDTO
    {
        public string? UserName { get; set; }
        public string? UserEmail { get; set; }
        public DateTime? Dateofbirth { get; set; }
        public int? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
    }
}
