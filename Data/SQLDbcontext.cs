using AMSSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace AMSSystem.Data
{
    public class SQLDbcontext : DbContext
    {
        public SQLDbcontext(DbContextOptions<SQLDbcontext> dbContextoptions ):base(dbContextoptions) { }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Account> accounts { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Branch> branches { get; set; } 
        public DbSet<Bank> banks { get; set; }
    }
}
