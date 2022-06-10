using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {    
        [HttpGet("not-found")]
        public ActionResult GetNotFound(){
            return NotFound();
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest(){
            return BadRequest(new ProblemDetails{
                Title = "This is a bad request"
            }); // Test for bad requests
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized(){
            
            return Unauthorized();
        }


        [HttpGet("validation-error")]
        public ActionResult GetValidationError(){
            ModelState.AddModelError("Problem 1", "This is the first error"); 
            ModelState.AddModelError("Problem 2", "This is the second error"); 
            return ValidationProblem();
            // returns 400 error and array of validation errors
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError(){
            throw new Exception("This is a server error!");
            // 
        }
    }
}