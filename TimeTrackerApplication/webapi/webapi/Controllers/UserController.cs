using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Generators;
using System.Net.Mail;
using System.Net;
using webapi.DTO.UserDTOs;
using webapi.Models;
using static Org.BouncyCastle.Math.EC.ECCurve;
using System.Xml.Linq;
using System;
using Google.Protobuf.Reflection;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

namespace webapi.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<UserController> logger;
        private readonly IConfiguration configuration;

        public UserController(ILogger<UserController> _logger, TimeTrackerDbContext _context, IConfiguration _configuration)
        {
            context = _context;
            this.logger = _logger;
            this.configuration = _configuration;
        }

        #region GET

        [HttpPost]
        [Route("loginUser")]
        public async Task<ActionResult> LoginUser([FromBody] LoginUserDTO userBody)
        {
            try
            {
                var user = await context.Users.Where(u => u.Email == userBody.Email).FirstOrDefaultAsync();

                if (user == null)
                {
                    return Unauthorized("User with this email does not exist!");
                }

                if(!BCrypt.Net.BCrypt.Verify(userBody.Password, user.Password))
                {
                    return Unauthorized("Wrong password");
                }

                if(user.IsEmailConfirmed == false)
                {
                    return BadRequest("Email must be verified, fist go to your email and verify!");
                }

                return Ok(new
                {
                    User = user,
                    AuthToken = Generate(user)
                });
            }
            catch (Exception ex)
            {
                return Ok(ex.Message);
            }
        }

        [HttpGet("signUpVerification/{id}/{conf}")]
        public async Task<ActionResult> signUpVerification(int id, int conf)
        {
            try
            {
                var user = await context.Users.Where(p => p.Id == id).FirstOrDefaultAsync();

                if (user == null)
                {
                    return NotFound("User with this id does not exist!");
                }

                if (user.ConfirmationCode != conf)
                    return BadRequest("Bad confirmation code!");


                user.IsEmailConfirmed = true;

                context.Users.Update(user);
                await context.SaveChangesAsync();

                return Ok("Succesfully created account, now you can sign in!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        #endregion

        #region POST

        [HttpPost]
        [Route("signup")]
        public async Task<ActionResult> SignUp([FromBody] UserRegisterDTO userDTO)
        {
            try
            {
                if (String.IsNullOrWhiteSpace(userDTO.Email) && userDTO.Email.Length > 40)
                    return BadRequest("Email must be below 40 caracters and can't be empty value!");
                
                if (String.IsNullOrWhiteSpace(userDTO.Password))
                    return BadRequest("Password can't be empty!");

                var testUser = await context.Users.Where(user => user.Email ==  userDTO.Email).FirstOrDefaultAsync();
                
                if (testUser != null) 
                {
                    return BadRequest("User with this email already exist!");
                }

                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);

                User user = new User();
                user.Email = userDTO.Email;
                user.Password = hashedPassword;
                user.CreatedAt = DateTime.Now;
                user.IsEmailConfirmed = false;
                user.Role = "User";
                user.Projects = new List<Project>();
                Random rnd = new Random();
                user.ConfirmationCode = rnd.Next(1, 1000000);

                context.Users.Add(user);
                await context.SaveChangesAsync();

                var verify = await context.Users.Where(p => p.Email == userDTO.Email).FirstOrDefaultAsync();
                try
                {
                    if (verify != null)
                    { 
                        Verification(verify);
                    }
                }
                catch (Exception)
                {
                    return BadRequest(new { msg = "Not valid email address!" });
                }

                return Ok(new {msg = "Succesfully registration!"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.InnerException?.Message);
            }

        }

        [HttpPost]
        [Route("/createToken")]
        public async Task<ActionResult> CreateToken([FromBody] LoginUserDTO userBody)
        {
            try
            {
                var user = await context.Users.Where(u => u.Email == userBody.Email).FirstOrDefaultAsync();

                if(user == null)
                {
                    return NotFound("User with this id does not exist!");
                }

                if(BCrypt.Net.BCrypt.Verify(user.Password, userBody.Password))
                {
                    var token = Generate(user);
                    return Ok(new { token = token });
                }
                else
                {
                    return Ok(null);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        #endregion

        #region PUT

        #endregion

        #region DELETE

        #endregion

        private static async void Verification(User user)
        {
            string message = "You created account on TimeTracker, so you need to verify your email address by clicking on the next link: " +
                "https://localhost:7164/user/signUpVerification/" + user.Id + "/" + user.ConfirmationCode + "\n\nWith respect TimeTracker team";

            SmtpClient Client = new SmtpClient()
            {
                Host = "smtp.outlook.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential()
                {
                    UserName = "quiz.m2s@outlook.com",
                    Password = "tester123"
                }
            };

            MailAddress fromMail = new MailAddress("quiz.m2s@outlook.com", "TimeTracker");
            MailAddress toMail = new MailAddress(user.Email, user.Email);
            MailMessage mesg = new MailMessage()
            {
                From = fromMail,
                Subject = "Verification email",
                Body = message
            };

            mesg.To.Add(toMail);
            await Client.SendMailAsync(mesg);
        }

        private object Generate(User user)
        {
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var claims = new[]{
        //    new Claim(ClaimTypes.Email, user.Email),
        //    new Claim(ClaimTypes.Role, user.Role),
        //    new Claim(ClaimTypes.Sid, user.Id.ToString())
        //};

        //    var token = new JwtSecurityToken(configuration["Jwt:Issuer"],
        //            configuration["Jwt:Audience"],
        //            claims,
        //            expires: DateTime.Now.AddHours(2),
        //            signingCredentials: credentials);

        //    return new JwtSecurityTokenHandler().WriteToken(token);

            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Sid, user.Id.ToString() ?? "")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
