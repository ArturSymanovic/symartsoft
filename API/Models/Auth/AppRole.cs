using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Models.Auth
{
    public class AppRole: IdentityRole
    {
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}