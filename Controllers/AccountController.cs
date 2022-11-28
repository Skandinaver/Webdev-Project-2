using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Webdev___Project_2.Models;

namespace Webdev___Project_2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public AccountController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        private readonly UserManager<IdentityUser> _userManager;

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
    }
}
