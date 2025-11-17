using AMSSystem.Data;
using AMSSystem.Models;
using AMSSystem.Models.DTO;
using Microsoft.EntityFrameworkCore;

namespace AMSSystem.Repos
{
    public class SQLBank : IBank
    {
        private readonly SQLDbcontext _db;

        public SQLBank(SQLDbcontext db) => _db = db;

        public async Task<List<Bank>> GetAllAsync(CancellationToken ct)
        {
            return await _db.banks.AsNoTracking()
                .OrderBy(b => b.BankName)
                .ToListAsync(ct);
        }

        public async Task<Bank?> GetByIdAsync(int bankId, CancellationToken ct)
        {
            return await _db.banks.AsNoTracking()
                .FirstOrDefaultAsync(b => b.BankId == bankId, ct);
        }

        public async Task<Bank> CreateAsync(CreateBankDTO dto, CancellationToken ct)
        {
            
            bool nameExists = await _db.banks.AnyAsync(b => b.BankName == dto.BankName, ct);
            if (nameExists) throw new InvalidOperationException("Bank name already exists.");

            var entity = new Bank
            {
                BankName = dto.BankName,
                BankType = dto.BankType,
                
            };

            _db.banks.Add(entity);
            await _db.SaveChangesAsync(ct);
            return entity;
        }

        public async Task<Bank?> UpdateAsync(int bankId, UpdateBankDTO dto, CancellationToken ct)
        {
            var entity = await _db.banks.FirstOrDefaultAsync(b => b.BankId == bankId, ct);
            if (entity is null) return null;

            if (!string.IsNullOrWhiteSpace(dto.BankName)) entity.BankName = dto.BankName!;
            if (dto.BankType == null) entity.BankType = dto.BankType!;
            

            await _db.SaveChangesAsync(ct);
            return entity;
        }

        public async Task<Bank?> DeleteAsync(int bankId, CancellationToken ct)
        {
            var entity = await _db.banks.FirstOrDefaultAsync(b => b.BankId == bankId, ct);
            if (entity is null) return null;

            _db.banks.Remove(entity);
            await _db.SaveChangesAsync(ct);
            return entity;
        }

        
    }
}