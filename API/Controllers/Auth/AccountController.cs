using System;
using System.Threading.Tasks;
using API.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Auth
{
    public class AccountController : BaseApiController
    {
        public UserManager<AppUser> UserManager { get; }
        public SignInManager<AppUser> SignInManager { get; }
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            this.SignInManager = signInManager;
            this.UserManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> Register(string username, string password)
        {
            if (await UserExists(username)) return BadRequest("Username is taken.");

            var userToCreate = new AppUser
            {
                UserName=username
            };
            
            var creationResult = await UserManager.CreateAsync(userToCreate, password);

            if (!creationResult.Succeeded)
            {
                return BadRequest(creationResult.Errors);
            }

            return await UserManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<bool> UserExists(string username)
        {
            return await UserManager.Users.AnyAsync(u => u.UserName == username);
        }

    }
}