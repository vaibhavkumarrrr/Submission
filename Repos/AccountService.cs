using AMSSystem.Data;
using AMSSystem.Models;
using AMSSystem.Models.DTO;
using Microsoft.EntityFrameworkCore;
using static AMSSystem.Models.DTO.AccountDTO;

namespace AMSSystem.Repos
{
    public class AccountService : IAccountService
    {
        private readonly SQLDbcontext dbcontext;

        public AccountService(SQLDbcontext _dbcontext)
        {
            this.dbcontext = _dbcontext;
        }
        public async Task<PagedResult<AccountListItemDto>> GetAccountsAsync(
            int pageNumber, int pageSize, CancellationToken ct)
        {
            var query = dbcontext.Accounts.AsNoTracking().OrderByDescending(a => a.CreatedOn);
            var total = await query.LongCountAsync(ct);

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new AccountListItemDto(
                    a.AccountId,
                    (AccountTypeDto)a.AccountType,
                    a.Balance,
                    a.BankId
                    ))
                .ToListAsync(ct);

            return new(items, pageNumber, pageSize, total);
        }

        public async Task<AccountDetailsDto> GetAccountDetailsAsync(int accountId, CancellationToken ct)
        {
            var ca = await dbcontext.CurrentAccounts.AsNoTracking().FirstOrDefaultAsync(a => a.AccountId == accountId, ct);
            if (ca != null)
                return new CurrentAccountDetailsDto(
                    ca.AccountId, (AccountTypeDto)ca.AccountType,
                    ca.DepositAmt, ca.Balance, ca.UserId, ca.BankId,
                    ca.WithDrawAmount);

            var sa = await dbcontext.SavingsAccounts.AsNoTracking().FirstOrDefaultAsync(a => a.AccountId == accountId, ct);
            if (sa != null)
                return new SavingsAccountDetailsDto(
                    sa.AccountId, (AccountTypeDto)sa.AccountType,
                    sa.DepositAmt, sa.Balance, sa.UserId, sa.BankId,
                    sa.WithDrawAmount);

            var fd = await dbcontext.FixedDepositAccounts.AsNoTracking().FirstOrDefaultAsync(a => a.AccountId == accountId, ct);
            if (fd != null)
                return new FixedDepositAccountDetailsDto(
                    fd.AccountId, (AccountTypeDto)fd.AccountType,
                    fd.DepositAmt, fd.Balance, fd.UserId, fd.BankId,
                    fd.RateofInterest, fd.Maturitydate);

            throw new KeyNotFoundException($"Account {accountId} not found");
        }

        public async Task<int> OpenCurrentAsync(OpenCurrentAccountRequest r, CancellationToken ct)
        {
            bool exists = await dbcontext.Accounts.AnyAsync(a => a.AccountId == r.AccountId, ct);
            if (exists) throw new InvalidOperationException("Account number already exists.");

            var entity = new CurrentAccount
            { 
                AccountName=r.AccountName,
                UserId = r.UserId,
                BankId = r.BankId,
                AccountType = (int)AccountTypeDto.Current,
                DepositAmt = r.OpeningDeposit,
                Balance = r.OpeningDeposit,
                WithDrawAmount = r.WithDrawAmount                
            };

            dbcontext.CurrentAccounts.Add(entity);
            await dbcontext.SaveChangesAsync(ct);
            return entity.AccountId;
        }

        public async Task<int> OpenSavingsAsync(OpenSavingsAccountRequest r, CancellationToken ct)
        {
            bool exists = await dbcontext.Accounts.AnyAsync(a => a.AccountId == r.AccountId, ct);
            if (exists) throw new InvalidOperationException("Account number already exists.");

            var entity = new SavingsAccount
            {
                AccountName = r.AccountName,
                UserId = r.UserId,
                BankId = r.BankId,
                AccountType = (int)AccountTypeDto.Current,
                DepositAmt = r.OpeningDeposit,
                Balance = r.OpeningDeposit,
                WithDrawAmount = r.WithDrawAmount
            };

            dbcontext.SavingsAccounts.Add(entity);
            await dbcontext.SaveChangesAsync(ct);
            return entity.AccountId;
        }
        public async Task<int> OpenFDAsync(OpenFDAccountRequest r, CancellationToken ct)
        {
            bool exists = await dbcontext.Accounts.AnyAsync(a => a.AccountId == r.AccountId, ct);
            if (exists) throw new InvalidOperationException("Account number already exists.");

            var entity = new FixedDepositAccount
            {
                AccountName = r.AccountName,
                UserId = r.UserId,
                BankId = r.BankId,
                AccountType = (int)AccountTypeDto.Current,
                DepositAmt=r.DepositAmt,
                RateofInterest=(int)r.RateOfInterest,
                Maturitydate=r.MaturityDate

            };

            dbcontext.FixedDepositAccounts.Add(entity);
            await dbcontext.SaveChangesAsync(ct);
            return entity.AccountId;
        
        }
        public async Task UpdateCurrentAsync(int id, UpdateCurrentAccountRequest r, CancellationToken ct)
        {
            var entity = await dbcontext.CurrentAccounts.FirstOrDefaultAsync(a => a.AccountId == id, ct)
                         ?? throw new KeyNotFoundException($"Current account {id} not found");

            if (r.WithDrawAmount.HasValue)
                entity.WithDrawAmount = r.WithDrawAmount.Value;            

            await dbcontext.SaveChangesAsync(ct); 
        }

        public async Task UpdateSavingsAsync(int id, UpdateSavingsAccountRequest r, CancellationToken ct)
        {
            var entity = await dbcontext.SavingsAccounts.FirstOrDefaultAsync(a => a.AccountId == id, ct)
                         ?? throw new KeyNotFoundException($"Current account {id} not found");

            if (r.WithDrawAmount.HasValue)
                entity.WithDrawAmount = r.WithDrawAmount.Value;

            await dbcontext.SaveChangesAsync(ct); 
        }

        public async Task UpdateFDAsync(int id, UpdateFDAccountRequest r, CancellationToken ct)
        {
            var entity = await dbcontext.FixedDepositAccounts.FirstOrDefaultAsync(a => a.AccountId == id, ct)
                         ?? throw new KeyNotFoundException($"Current account {id} not found");

            if (r.RateOfInterest.HasValue)
                entity.RateofInterest = (int)r.RateOfInterest.Value;            

            await dbcontext.SaveChangesAsync(ct);
        }

        public async Task DeleteAsync(int accountId, CancellationToken ct)
        {
            var entity = await dbcontext.Accounts.FirstOrDefaultAsync(a => a.AccountId == accountId, ct)
                         ?? throw new KeyNotFoundException($"Account {accountId} not found");

            dbcontext.Remove(entity); 
            await dbcontext.SaveChangesAsync(ct);
        }
    }

}
