using System;
using API.Data;
using API.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace API.Controllers
{
    public class ErrorEmittingController : BaseApiController
    {
        public DataContext Context { get; }

        public ErrorEmittingController(DataContext context)
        {
            this.Context = context;

        }

        [Authorize]
        [HttpGet("unauthorized")]
        public ActionResult<string> GetUnauthorized()
        {
            Log.Error(new Exception("test"), "test message");
            return "unauthorized data";
        }

        [HttpGet("notfound")]
        public ActionResult<AppUser> GetNotFound()
        {
            var notExistingUser = Context.Users.Find("notexists");

            if (notExistingUser == null) return NotFound();

            return Ok(notExistingUser);
        }

        [HttpGet("servererror")]
        public ActionResult<string> GetServerError()
        {
            var notExistingUser = Context.Users.Find("notexists");
            var valueThorowsException = notExistingUser.ToString();
            return valueThorowsException;
        }

        [HttpGet("badrequest")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("Bad request message");
        }
    }
}