
namespace AMSSystem.Models.DTO
{
    public class BankDTO
    {
        public int BankId { get; set; }
        public string BankName { get; set; } = string.Empty;
        public int BankType { get; set; } =0;  
        
    }

    public class CreateBankDTO
    {
        public string BankName { get; set; } = string.Empty;
        public int BankType { get; set; } =0;
    }

    public class UpdateBankDTO
    {
        public string? BankName { get; set; }
        public int BankType { get; set; } 
    }
}