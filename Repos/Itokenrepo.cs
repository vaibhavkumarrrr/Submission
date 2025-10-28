using Microsoft.AspNetCore.Identity;

namespace AMSSystem.Repos
{
    public interface Itokenrepo
    {
        string createJWTtoken(IdentityUser user, List<string> roles);
    }
}
