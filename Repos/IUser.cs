using AMSSystem.Models;
using AMSSystem.Models.DTO;

namespace AMSSystem.Repos
{
    public interface IUser
    {

        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);

        Task<User> DeleteAsync(int id);

        Task<User> CreateAsync(UserDTO userDTO);

        Task<User> UpdateAsync(int id, UserDTO userDTO);

    }
}
