// AMSSystem.Controllers/BankController.cs
using AMSSystem.Models.DTO;
using AMSSystem.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMSSystem.Controllers
{
    [ApiController]
    [Route("api/banks")]
    public class BankController : ControllerBase
    {
        private readonly IBank _repo;

        public BankController(IBank repo) => _repo = repo;
        
        [HttpGet]
        [Authorize(Roles = "ViewOnly,SuperAdmin")]
        public async Task<IActionResult> GetAllAsync(CancellationToken ct)
        {
            var banks = await _repo.GetAllAsync(ct);
            return Ok(banks);
        }
        
        [HttpGet("{id:int}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> GetById([FromRoute] int id, CancellationToken ct)
        {
            var bank = await _repo.GetByIdAsync(id, ct);
            if (bank is null) return NotFound();
            return Ok(bank);
        }
        
        [HttpPost]
        [Authorize(Roles = "ViewOnly,SuperAdmin")]
        public async Task<IActionResult> Create([FromBody] CreateBankDTO dto, CancellationToken ct)
        {
            var created = await _repo.CreateAsync(dto, ct);
            return CreatedAtAction(nameof(GetById), new { id = created.BankId }, created);
        }
                
        [HttpPut("{id:int}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateBankDTO dto, CancellationToken ct)
        {
            var updated = await _repo.UpdateAsync(id, dto, ct);
            if (updated is null) return NotFound();
            return Ok(updated);
        }
       
        [HttpDelete("{id:int}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken ct)
        {
            var deleted = await _repo.DeleteAsync(id, ct);
            if (deleted is null) return NotFound();
            return Ok(deleted);
        }        
    }
}