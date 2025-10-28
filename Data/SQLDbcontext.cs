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
            
            modelBuilder.Entity<Account>().UseTptMappingStrategy().ToTable("Accounts",schema: "Training");
            modelBuilder.Entity<CurrentAccount>().UseTptMappingStrategy().ToTable("CurrentAccounts", schema: "Training");
            modelBuilder.Entity<SavingsAccount>().UseTptMappingStrategy().ToTable("SavingsAccount", schema: "Training");
            modelBuilder.Entity<FixedDepositAccount>().UseTptMappingStrategy().ToTable("FDAccount", schema: "Training");

            modelBuilder.Entity<User>().ToTable("Users", schema: "Training");
            modelBuilder.Entity<BankUser>().ToTable("BankUser", schema: "Training");

            modelBuilder.Entity<Bank>().ToTable("Banks", schema: "Training");

            modelBuilder.Entity<Branch>().ToTable("Branch", schema: "Training");
            
            /*modelBuilder.Entity<User>()
                    .HasMany(u => u.accounts)
                    .WithMany(a => a.users).UsingEntity(j=>j.ToTable("Users",schema : "Training")); 
*/
        }

        public DbSet<Account> accounts { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Branch> branches { get; set; } 
        public DbSet<Bank> banks { get; set; }
    }
}
