namespace AMSSystem.Models
{
    public class User :BaseEntity<long>
    {
        public int UserId { get; set; }
        //public int AccountId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;

        public DateTime Dateofbirth { get; set; }

        //public bool POAuser { get; set; }

        //public Account Account { get; set; } = new Account();

        //public List<Account> accounts { get; set; }
    }
}
