using AMSSystem.Models;
using AMSSystem.Models.DTO;
using static AMSSystem.Models.DTO.AccountDTO;

namespace AMSSystem.Repos
{
    public interface IUser
    {

        Task<List<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);

        Task<User> DeleteAsync(int id);

        Task<User> CreateAsync(UserDTO userDTO);

        Task<User> UpdateAsync(int id, UserDTO userDTO);

        Task<List<AccountListItemDto>>GetUserAccountsAsync(
           int userId,
           int? bankId,
           AccountDTO.AccountTypeDto? accountType,
           CancellationToken ct);

    }
}
