using AMSSystem.Data;
using AMSSystem.Models;
using AMSSystem.Models.DTO;
using Microsoft.EntityFrameworkCore;
using static AMSSystem.Models.User;

namespace AMSSystem.Repos
{
    public class SQLBankUser : IBankUser
    {
        private readonly SQLDbcontext _db;

        public SQLBankUser(SQLDbcontext db) => _db = db;

        public async Task<List<BankUser>> GetAllAsync(CancellationToken ct)
        {
            return await _db.BankUsers.AsNoTracking().ToListAsync(ct);
        }

        public async Task<BankUser?> GetByIdAsync(int id, CancellationToken ct)
        {
            return await _db.BankUsers.AsNoTracking()
                .FirstOrDefaultAsync(u => u.UserId == id, ct);
        }

        public async Task<BankUser> CreateAsync(CreateBankUserDTO dto, CancellationToken ct)
        {
            
            var existsEmail = await _db.users.AnyAsync(u => u.UserEmail == dto.UserEmail, ct);
            if (existsEmail) throw new InvalidOperationException("Email already in use.");

            var entity = new BankUser
            {
                UserName = dto.UserName,
                UserEmail = dto.UserEmail,
                Dateofbirth = dto.Dateofbirth ?? default,
                EmployeeId = dto.EmployeeId,
                EmployeeName = dto.EmployeeName,
                CreatedOn = DateTime.UtcNow
            };

            _db.BankUsers.Add(entity);
            await _db.SaveChangesAsync(ct);
            return entity;
        }

        public async Task<BankUser?> UpdateAsync(int id, UpdateBankUserDTO dto, CancellationToken ct)
        {
            var entity = await _db.BankUsers.FirstOrDefaultAsync(u => u.UserId == id, ct);
            if (entity is null) return null;

            if (dto.UserName is not null) entity.UserName = dto.UserName;
            if (dto.UserEmail is not null) entity.UserEmail = dto.UserEmail;
            if (dto.Dateofbirth.HasValue) entity.Dateofbirth = dto.Dateofbirth.Value;
            if (dto.EmployeeId.HasValue) entity.EmployeeId = dto.EmployeeId.Value;
            if (dto.EmployeeName is not null) entity.EmployeeName = dto.EmployeeName;

            entity.ModifiedOn = DateTime.UtcNow;

            await _db.SaveChangesAsync(ct);
            return entity;
        }
        public async Task<BankUser?> DeleteAsync(int id, CancellationToken ct)
        {
            var entity = await _db.BankUsers.FirstOrDefaultAsync(u => u.UserId == id, ct);
            if (entity is null) return null;

            _db.BankUsers.Remove(entity);
            await _db.SaveChangesAsync(ct);
            return entity;
        }
    }
}