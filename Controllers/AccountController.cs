using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Webdev___Project_2.JwtFeatures;
using Webdev___Project_2.Models;
using Webdev___Project_2.Models.DTO;

namespace Webdev___Project_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public AccountController(UserManager<IdentityUser> userManager, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtHandler _jwtHandler;

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> RegisterUser(UserForReg userForReg)
        {
            var user = new IdentityUser(userForReg.UserName);
            var result = await _userManager.CreateAsync(user, userForReg.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegResponse { Errors = errors });
            }
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForAuth userForAuth)
        {
            var user = await _userManager.FindByNameAsync(userForAuth.UserName);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuth.Password))
                return Unauthorized(new AuthResponse { ErrorMessage = "Invalid Authentication" });
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponse { IsAuthSuccessful = true, Token = token });
        }
    }
}
