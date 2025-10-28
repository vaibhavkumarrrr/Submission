using System.Reflection.Metadata.Ecma335;

namespace AMSSystem.Models
{
    public abstract class Account : BaseEntity<long>
    {
        public int AccountId { get; set; }
        public int UserId { get; set; }
        public int BankId { get; set; }
        public decimal DepositAmt { get; set; }
        public string? AccountName { get; set; }

        public decimal Balance { get; set; }

        public int AccountType { get; set; }

        public User user { get; set; } = new User();

        public ICollection<User> users { get; set; } = new List<User>();

        public Bank bank { get; set; } = new Bank();

        public List<Bank> banks { get; set; }

        public virtual void Deposit(decimal DepositAmt)
        {
            if (DepositAmt < 0)
            {
                throw new ArgumentOutOfRangeException("InsuffientBaleance");
            }
            Balance += DepositAmt;

        }
        public virtual void Withdraw(decimal withdrawAmount)
        {
            throw new InvalidOperationException("No withdrwal allowed for this account Type");
        }
        public decimal ViewBalance()
        {
            return Balance;
        }

        public abstract class WithdrawableAccount : Account
        {
            public decimal WithDrawAmount { get; set; }

            public override void Withdraw(decimal withdrawAmount)
            {
                base.Withdraw(withdrawAmount);
            }
        }
        public class SavingsAccount : WithdrawableAccount
        {
            
            public override void Deposit(decimal DepositAmt)
            {

            }
            public decimal ViewBalance()
            {
                return Balance;
            }
        }
        public class CurrentAccount : WithdrawableAccount
        {
            
            public decimal ViewBalance()
            {
                return Balance;
            }
        }

        public abstract class NonWithDrawableAccount : Account
        {
            public virtual decimal ViewBalancewithInterest(int RateofInterest) {
                Balance = Balance + (Balance * RateofInterest);
                return Balance;
            }
        }

        public class FixedDepositAccount : NonWithDrawableAccount
        {
            
            public int RateofInterest { get; set; }
            public DateTime Maturitydate { get; set; }

            public override decimal ViewBalancewithInterest(int RateofInterest)
            {
                return base.ViewBalancewithInterest(RateofInterest);
            }
        }

    }

}
