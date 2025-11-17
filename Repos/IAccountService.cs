using System;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using static AMSSystem.Models.DTO.AccountDTO;


namespace AMSSystem.Repos
{        
    public interface IAccountService
        {                      
          Task<PagedResult<AccountListItemDto>> GetAccountsAsync(
                int pageNumber,
                int pageSize,
                CancellationToken ct);
          Task<AccountDetailsDto> GetAccountDetailsAsync(
                int accountId,
                CancellationToken ct);

          Task<int> OpenCurrentAsync(
                OpenCurrentAccountRequest request,
                CancellationToken ct);

          Task<int> OpenSavingsAsync(
               OpenSavingsAccountRequest request,
               CancellationToken ct);

          Task<int> OpenFDAsync(
                OpenFDAccountRequest request,            
                CancellationToken ct);


           Task UpdateCurrentAsync(
            int accountId,
            UpdateCurrentAccountRequest request,
            CancellationToken ct);

          Task UpdateSavingsAsync(
            int accountId,
            UpdateSavingsAccountRequest request,
            CancellationToken ct);

          Task UpdateFDAsync(
            int accountId,
            UpdateFDAccountRequest request,
            CancellationToken ct);

          Task DeleteAsync(
            int accountId,
            CancellationToken ct);
    }

}

