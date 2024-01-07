using System.ComponentModel.DataAnnotations;
using webapi.Models;

namespace webapi.DTO.UserDTOs
{
    public class UserRegisterDTO
    {
        public string Email { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

    }
}
