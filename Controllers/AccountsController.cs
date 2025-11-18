using AMSSystem.Models.DTO;
using AMSSystem.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static AMSSystem.Models.DTO.AccountDTO;

namespace AMSSystem.Controllers
{
    [Route("api/")]
    [ApiController]
    public class AccountsController:ControllerBase
    {
        private readonly IAccountService _service;
        public AccountsController(IAccountService service) => _service = service;

        [HttpGet("accounts")]
        [Authorize(Roles = "ViewOnly,User,SuperAdmin")]
        public async Task<ActionResult<PagedResult<AccountListItemDto>>> GetAccounts(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken ct = default)
        {
            var result = await _service.GetAccountsAsync(pageNumber, pageSize, ct);
            return Ok(result);
        }

        [HttpGet("accounts/{id:int}")]
        [Authorize(Roles = "ViewOnly,User,SuperAdmin")]

        public async Task<ActionResult<AccountDetailsDto>> GetAccountById([FromRoute] int id, CancellationToken ct)
        {
            var dto = await _service.GetAccountDetailsAsync(id, ct);
            return Ok(dto);
        }

        [HttpGet("accounts/current/{id:int}")]
        [Authorize(Roles = "ViewOnly,User,SuperAdmin")]
        public async Task<ActionResult<AccountDTO.CurrentAccountDetailsDto>> GetCurrent([FromRoute] int id, CancellationToken ct)
        {
            var dto = await _service.GetAccountDetailsAsync(id, ct);
            if (dto is CurrentAccountDetailsDto typed) return Ok(typed);
            return NotFound(); 
        }

        [HttpGet("accounts/saving/{id:int}")]
        [Authorize(Roles = "ViewOnly,User,SuperAdmin")]
        public async Task<ActionResult<SavingsAccountDetailsDto>> GetSaving([FromRoute] int id, CancellationToken ct)
        {
            var dto = await _service.GetAccountDetailsAsync(id, ct);
            if (dto is SavingsAccountDetailsDto typed) return Ok(typed);
            return NotFound(); 
        }

        [HttpGet("accounts/FixedDeposit/{id:int}")]
        [Authorize(Roles = "ViewOnly,User,SuperAdmin")]
        public async Task<ActionResult<FixedDepositAccountDetailsDto>> GetFixedAccount([FromRoute] int id, CancellationToken ct)
        {
            var dto = await _service.GetAccountDetailsAsync(id, ct);
            if (dto is FixedDepositAccountDetailsDto typed) return Ok(typed);
            return NotFound(); 
        }

        [HttpPost("accounts/Current")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> OpenCurrent([FromBody] OpenCurrentAccountRequest req, CancellationToken ct)
        {
           
            var id = await _service.OpenCurrentAsync(req, ct);
            return CreatedAtAction(nameof(GetAccountById), new { id }, new { accountId = id });
        }

        [HttpPost("accounts/Savings")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> OpenSavings([FromBody] OpenSavingsAccountRequest req, CancellationToken ct)
        {

            var id = await _service.OpenSavingsAsync(req, ct);
            return CreatedAtAction(nameof(GetAccountById), new { id }, new { accountId = id });
        }

        [HttpPost("accounts/FD")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> OpenFD([FromBody] OpenFDAccountRequest req, CancellationToken ct)
        {

            var id = await _service.OpenFDAsync(req, ct);
            return CreatedAtAction(nameof(GetAccountById), new { id }, new { accountId = id });
        }

        [HttpPatch("accounts/Current/{id:int}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> UpdateCurrent([FromRoute] int id, [FromBody] UpdateCurrentAccountRequest req, CancellationToken ct)
        {
            await _service.UpdateCurrentAsync(id, req, ct);
            return NoContent();
        }

        [HttpPatch("accounts/Savings/{id:int}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> UpdateSavings([FromRoute] int id, [FromBody] UpdateSavingsAccountRequest req, CancellationToken ct)
        {
            await _service.UpdateSavingsAsync(id, req, ct);
            return NoContent();
        }

        [HttpPatch("accounts/FD/{id:int}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> UpdateFD([FromRoute] int id, [FromBody] UpdateFDAccountRequest req, CancellationToken ct)
        {
            await _service.UpdateFDAsync(id, req, ct);
            return NoContent();
        }

        [HttpDelete("accounts/{id:int}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> CloseAccount([FromRoute] int id, CancellationToken ct)
        {
            await _service.DeleteAsync(id, ct);
            return NoContent();
        }
    }
}

