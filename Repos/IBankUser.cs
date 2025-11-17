using AMSSystem.Models;
using AMSSystem.Models.DTO;
using static AMSSystem.Models.User;

namespace AMSSystem.Repos
{
    public interface IBankUser
    {
        Task<List<BankUser>> GetAllAsync(CancellationToken ct);
        Task<BankUser?> GetByIdAsync(int id, CancellationToken ct);
        Task<BankUser> CreateAsync(CreateBankUserDTO dto, CancellationToken ct);
        Task<BankUser?> UpdateAsync(int id, UpdateBankUserDTO dto, CancellationToken ct);
        Task<BankUser?> DeleteAsync(int id, CancellationToken ct);
    }
}
