using AMSSystem.Data;
using AMSSystem.Models;
using AMSSystem.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using static AMSSystem.Models.User;

namespace AMSSystem.Repos
{
    public class SQLUser : IUser
    {
        private readonly SQLDbcontext dbcontext;

        public SQLUser(SQLDbcontext _dbcontext)
        {
            this.dbcontext = _dbcontext;
        }

        public async Task<List<User>> GetAllAsync()
        {
            var userlist = await dbcontext.users.ToListAsync();
            return userlist;
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await dbcontext.users.FirstOrDefaultAsync((x => x.UserId == id));
            
        }            

        public async Task<User> CreateAsync(UserDTO userDto)
        {
            var user = new User();
            await dbcontext.users.AddAsync(user);
            user.UserName = userDto.UserName;
            user.UserEmail = userDto.UserEmail;
            user.Dateofbirth = userDto.Dateofbirth;
            await dbcontext.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateAsync(int id, UserDTO userDto)
        {
            var UpdateUser = await dbcontext.users.FirstOrDefaultAsync(x => x.UserId == id);

            if (UpdateUser == null)
            {
                return null;
            }
            UpdateUser.UserName = userDto.UserName;
            UpdateUser.UserEmail = userDto.UserEmail;
            UpdateUser.Dateofbirth = userDto.Dateofbirth;

            await dbcontext.SaveChangesAsync();

            return UpdateUser;

        }

        public async Task<User> DeleteAsync(int id)
        {
            var removeUser = await dbcontext.users.FirstOrDefaultAsync(x => x.UserId == id);

            if (removeUser == null)
            {
                return null;
            }
            dbcontext.users.Remove(removeUser);
            await dbcontext.SaveChangesAsync();

            return removeUser;


        }
    }
}
