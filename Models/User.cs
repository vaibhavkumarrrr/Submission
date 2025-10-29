namespace AMSSystem.Models
{
    public class User : BaseEntity
    {
        public int UserId { get; set; }
        //public int AccountId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;

        public DateTime Dateofbirth { get; set; }

        //public bool POAuser { get; set; }

        //public Account Account { get; set; } = new Account();

        //public ICollection<Account> accounts { get; set; } = new List<Account>();


        public class BankUser : User
        {
            
            public int EmployeeId { get; set; }
           // public Bank Bank { get; set; } = new Bank();
            public string EmployeeName { get; set; } = string.Empty;

            //public int BankId { get; set; }

        }
    }
}
