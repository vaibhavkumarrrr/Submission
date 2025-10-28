using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AMSSystem.Data
{
    public class AuthDbContext : IdentityDbContext
    {
        public AuthDbContext(DbContextOptions<AuthDbContext> options) : base(options)
        {
        }

        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            var ReaderRoleId = "eb91c622-04cb-46a7-8282-09bf71864197";
            var WriterRoleId = "eb91c622-04cb-46a7-8282-09bf71864198";
            var SuperUserRoleId = "eb91c622-04cb-46a7-8282-09bf71864199";


            var roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = ReaderRoleId, 
                    ConcurrencyStamp = ReaderRoleId,
                    Name = "Viewonly", 
                    NormalizedName = "Viewonly".ToUpper() 
                },
                new IdentityRole
                {
                    Id = WriterRoleId,
                    ConcurrencyStamp = WriterRoleId,
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper()
                },
                new IdentityRole
                {
                    Id = SuperUserRoleId ,
                    ConcurrencyStamp = SuperUserRoleId ,
                    Name = "SuperUser",
                    NormalizedName = "SuperUser".ToUpper()
                }
            };

            
            builder.Entity<IdentityRole>().HasData(roles);//seeding
        }
    }
}
