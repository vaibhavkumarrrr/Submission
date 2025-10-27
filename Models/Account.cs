namespace AMSSystem.Models
{
    public class Account : BaseEntity<long>
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }
        public int BankId { get; set; }
        public decimal DepositAmt { get; set; }
        public string? AccountName { get; set; }

        public int AccountType { get; set; }

        public User User { get; set; } = new User();

        public List<User> Users { get; set; }

        public Bank bank { get; set; } = new Bank();       

        public List<Bank> banks { get; set; }
    }
}
