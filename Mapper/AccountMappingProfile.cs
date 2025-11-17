using AutoMapper;
using static AMSSystem.Models.DTO.AccountDTO;
using static AMSSystem.Models.Account;
using AMSSystem.Models;

namespace AMSSystem.Mapper
{
    public class AccountMappingProfile:Profile
    {
        public AccountMappingProfile()
        {
            CreateMap<Account, AccountListItemDto>()
                .ForMember(d => d.AccountType, o => o.MapFrom(s => (AccountTypeDto)s.AccountType));

            CreateMap<CurrentAccount, CurrentAccountDetailsDto>()
                .ConstructUsing(s => new CurrentAccountDetailsDto(
                    s.AccountId, (AccountTypeDto)s.AccountType, s.DepositAmt, s.Balance,
                    s.UserId, s.BankId,s.WithDrawAmount));

            CreateMap<SavingsAccount, SavingsAccountDetailsDto>()
                .ConstructUsing(s => new SavingsAccountDetailsDto(
                    s.AccountId, (AccountTypeDto)s.AccountType, s.DepositAmt, s.Balance,
                    s.UserId, s.BankId, s.WithDrawAmount));

            CreateMap<FixedDepositAccount, FixedDepositAccountDetailsDto>()
                .ConstructUsing(s => new FixedDepositAccountDetailsDto(
                    s.AccountId,(AccountTypeDto)s.AccountType, s.DepositAmt, s.Balance,
                    s.UserId, s.BankId, s.RateofInterest, s.Maturitydate));
        }
    }
}

