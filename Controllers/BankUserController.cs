using AMSSystem.Models.DTO;
using AMSSystem.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMSSystem.Controllers
{
    [ApiController]
    [Route("api/bankusers")]
    public class BankUserController : ControllerBase
    {
        private readonly IBankUser _repo;
        public BankUserController(IBankUser repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Authorize(Roles = "ViewOnly,Admin,SuperAdmin")]
        public async Task<IActionResult> GetAllAsync(CancellationToken ct)
        {
            var result = await _repo.GetAllAsync(ct);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "ViewOnly,Admin,SuperAdmin")]
        public async Task<IActionResult> GetById(int id, CancellationToken ct)
        {
            var result = await _repo.GetByIdAsync(id, ct);
            if (result is null) return NotFound();
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> Create([FromBody] CreateBankUserDTO dto, CancellationToken ct)
        {
            var created = await _repo.CreateAsync(dto, ct);
            return CreatedAtAction(nameof(GetById), new { id = created.UserId }, created);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin,SuperAdmin")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateBankUserDTO dto, CancellationToken ct)
        {
            var updated = await _repo.UpdateAsync(id, dto, ct);
            if (updated is null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(int id, CancellationToken ct)
        {
            var deleted = await _repo.DeleteAsync(id, ct);
            if (deleted is null) return NotFound();
            return Ok(deleted);
        }
    }
}