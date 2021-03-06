using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using API.Models.Auth;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers.Auth
{
    public class AccountController : BaseApiController
    {
        public UserManager<AppUser> UserManager { get; }
        public SignInManager<AppUser> SignInManager { get; }
        public IMapper Mapper { get; }
        public ITokenService TokenService { get; }
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, ITokenService tokenService)
        {
            this.TokenService = tokenService;
            this.Mapper = mapper;
            this.SignInManager = signInManager;
            this.UserManager = userManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = Mapper.Map<AppUser>(registerDto);

            var result = await UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(result.Errors);

            var userDto = Mapper.Map<UserDto>(user);
            userDto.Token = TokenService.CreateToken(user);
            return userDto;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await UserManager.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null) return Unauthorized("Invalid Credentials");

            var result = await SignInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalid Credentials");

            var userDto = Mapper.Map<UserDto>(user);
            userDto.Token = TokenService.CreateToken(user);
            return userDto;
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<ActionResult> DeleteOwnAccount()
        {
            var currentUser = await UserManager.Users.FirstOrDefaultAsync(u => u.UserName == User.GetUserName());
            var result = await UserManager.DeleteAsync(currentUser);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            return Ok();
        }

        // [HttpPost("deleteallusers")]
        // public async Task<ActionResult> DeleteAllUsers()
        // {
        //     var users = await UserManager.Users.ToListAsync();

        //     foreach (var user in users)
        //     {
        //         await UserManager.DeleteAsync(user);
        //     }
        //     return Ok();
        // }

    }
}