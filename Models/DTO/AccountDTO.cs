namespace AMSSystem.Models.DTO
{
    public class AccountDTO
    {              
            public enum AccountTypeDto {Current = 1, Savings = 2, FixedDeposit = 3 }            
            public record AccountListItemDto(
                int AccountId,
                AccountTypeDto AccountType,
                decimal Balance,
                int BankId
                );
                   
            public abstract record AccountDetailsDto(
                int AccountId,
                AccountTypeDto AccountType,
                decimal DepositAmt,
                decimal Balance,
                int UserId,
                int BankId
                );

            public sealed record CurrentAccountDetailsDto(
                int AccountId, AccountTypeDto AccountType,
                decimal DepositAmt, decimal Balance, int UserId, int BankId,
                decimal? WithDrawAmount) : AccountDetailsDto(AccountId, AccountType, DepositAmt, Balance, UserId, BankId);

            public sealed record SavingsAccountDetailsDto(
                int AccountId,AccountTypeDto AccountType,
                decimal DepositAmt, decimal Balance, int UserId, int BankId, 
                decimal WithDrawAmount) : AccountDetailsDto(AccountId, AccountType, DepositAmt, Balance, UserId, BankId);

            public sealed record FixedDepositAccountDetailsDto(
                int AccountId,AccountTypeDto AccountType,
                decimal DepositAmt, decimal Balance, int UserId, int BankId,
                decimal RateOfInterest, DateTime Maturitydate) : AccountDetailsDto(AccountId, AccountType, DepositAmt, Balance, UserId, BankId);

            public record OpenCurrentAccountRequest(
                int UserId, int BankId,string AccountName,
                int AccountId,AccountTypeDto AccountType,
                decimal OpeningDeposit,
                decimal WithDrawAmount);

            public record OpenSavingsAccountRequest(
                int UserId, int BankId,
                int AccountId,string AccountName,
                decimal OpeningDeposit,
                decimal WithDrawAmount);

            public record OpenFDAccountRequest(
                int UserId, int BankId,
                int AccountId,string AccountName,
                decimal DepositAmt,
                decimal RateOfInterest,
                DateTime MaturityDate);

            public record UpdateCurrentAccountRequest(decimal? WithDrawAmount);
            public record UpdateSavingsAccountRequest(decimal? WithDrawAmount);
            public record UpdateFDAccountRequest(decimal? RateOfInterest, DateTime? MaturityDate);            
            public record PagedResult<T>(IReadOnlyList<T> Items, int PageNumber, int PageSize, long TotalCount);
        }
    }


