using AMSSystem.Data;
using AMSSystem.Models;
using AMSSystem.Models.DTO;
using AMSSystem.Repos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AMSSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(SQLDbcontext sqlDBContext, IUser user) : ControllerBase
    {
        private readonly SQLDbcontext sqlDBContext = sqlDBContext;
        private readonly IUser user = user;

        [HttpGet]
        [Authorize(Roles = "Viewonly,SuperUser,Admin,SysAdmin")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await user.GetAllAsync();
            return Ok(result);
        }
        [HttpGet]
        [Route("{id:int}")]
        [Authorize(Roles = "Viewonly,SuperUser,Admin,SysAdmin")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var result = await user.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "SuperUser,SysAdmin,Admin")]
        public async Task<IActionResult> CreateUser([FromBody] UserDTO userDto)
        {

            var result = await user.CreateAsync(userDto);
            return Ok(result);
        }
        [HttpPut]
        [Authorize(Roles ="SuperUser,SysAdmin")]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, UserDTO userDto)
        {
            var result = await user.UpdateAsync(id, userDto);
            if (result != null)
            {
                return Ok(result);
            }
            return BadRequest();
        }
        [HttpDelete]
        [Authorize(Roles ="SuperUser")]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var deleteUser = await user.DeleteAsync(id);
            if (deleteUser == null)            
                return NotFound();
            
            return Ok(deleteUser);

        }
    }
}
