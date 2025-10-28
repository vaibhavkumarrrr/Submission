using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static AMSSystem.Repos.TokenRepo;

namespace AMSSystem.Repos
{
        public class TokenRepo : Itokenrepo
        {
            private readonly IConfiguration configuration;


            public TokenRepo(IConfiguration configuration)
            {
                this.configuration = configuration;
            }


            public string createJWTtoken(IdentityUser user, List<string> roles)
            {

                var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email!)
            };

                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }


                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["Jwt:key"]!)
                );


                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


                var token = new JwtSecurityToken(
                    issuer: configuration["Jwt:Issuer"],
                    audience: configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(15), //15 minutes
                    signingCredentials: credentials
                );


                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }
    }

