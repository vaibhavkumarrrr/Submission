
using AMSSystem.Models;
using AMSSystem.Models.DTO;

namespace AMSSystem.Repos
{
    public interface IBank
    {
        Task<List<Bank>> GetAllAsync(CancellationToken ct);
        Task<Bank?> GetByIdAsync(int bankId, CancellationToken ct);
        Task<Bank> CreateAsync(CreateBankDTO dto, CancellationToken ct);
        Task<Bank?> UpdateAsync(int bankId, UpdateBankDTO dto, CancellationToken ct);
        Task<Bank?> DeleteAsync(int bankId, CancellationToken ct);
        
    }
}