using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Auth
{
    public class AppUser: IdentityUser
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}