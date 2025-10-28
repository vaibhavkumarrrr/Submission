using AMSSystem.Models.DTO;
using AMSSystem.Repos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AMSSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> usermanager;
        private readonly Itokenrepo tokenrepo;
        public AuthController(UserManager<IdentityUser> usermanager, Itokenrepo tokenrepo)
        {
           this.usermanager = usermanager;
           this.tokenrepo = tokenrepo;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO registerRequestDto)
        {
            var identityUser = new IdentityUser
            {
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username
            };

            
            var identityResult = await usermanager.CreateAsync(identityUser, registerRequestDto.Password);

            
            if (identityResult.Succeeded)
            {
                
                if (registerRequestDto.Roles != null && registerRequestDto.Roles.Any())
                {
                    identityResult = await usermanager.AddToRolesAsync(identityUser, registerRequestDto.Roles);

                    // If role assignment is also successful
                    if (identityResult.Succeeded)
                        return Ok("Hurray!!!! \n User registered, Please login ");
                }
                ;
            }

            return BadRequest("Something went wrong \nCheck again");
        }

        
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginRequestDTO loginRequestDTO)
        {
            
            var user = await usermanager.FindByEmailAsync(loginRequestDTO.Username);

            
            if (user != null)
            {
                
                var checkpasswordresult = await usermanager.CheckPasswordAsync(user, loginRequestDTO.Password);

                if (checkpasswordresult)
                {
                    
                    var roles = await usermanager.GetRolesAsync(user);

                    if (roles != null)
                    {
                        
                        var jwttoken = tokenrepo.createJWTtoken(user, roles.ToList());

                        
                        var response = new LoginResponseDTO
                        {
                            jwttoken = jwttoken,
                        };
                        return Ok(response);
                    }
                }
            }

            return BadRequest("Check the username or password Again!!");
        }
    }
}
