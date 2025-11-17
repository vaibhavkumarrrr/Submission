using AMSSystem.Models;
using Microsoft.EntityFrameworkCore;
using static AMSSystem.Models.Account;
using static AMSSystem.Models.User;

namespace AMSSystem.Data
{
    public class SQLDbcontext : DbContext
    {
        public SQLDbcontext(DbContextOptions<SQLDbcontext> dbContextoptions ):base(dbContextoptions) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            

            modelBuilder.Entity<Account>().UseTptMappingStrategy().ToTable("Accounts", schema: "Training");
            modelBuilder.Entity<CurrentAccount>().ToTable("CurrentAccounts", schema: "Training").HasBaseType<Account>(); ;
            modelBuilder.Entity<SavingsAccount>().ToTable("SavingsAccount", schema: "Training").HasBaseType<Account>(); ;
            modelBuilder.Entity<FixedDepositAccount>().ToTable("FDAccount", schema: "Training").HasBaseType<Account>(); ;

            modelBuilder.Entity<User>().UseTptMappingStrategy().ToTable("Users", schema: "Training");
            modelBuilder.Entity<BankUser>().ToTable("BankUser", schema: "Training");

            modelBuilder.Entity<Bank>().ToTable("Banks", schema: "Training");

            modelBuilder.Entity<Branch>().ToTable("Branch", schema: "Training");


        }

        public DbSet<Account> accounts { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<BankUser> BankUsers { get; set; }
        public DbSet<Branch> branches { get; set; }
        public DbSet<Bank> banks { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<SavingsAccount> SavingsAccounts { get; set; }
        public DbSet<CurrentAccount> CurrentAccounts { get; set; }
        public DbSet<FixedDepositAccount> FixedDepositAccounts { get; set; }
    }
}

