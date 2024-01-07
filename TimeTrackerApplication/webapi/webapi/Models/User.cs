
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; set; }

        public List<Project>? Projects { get; set; } = new List<Project>();

        public string ImageUrl { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        public bool IsEmailConfirmed { get; set; } = false;

        public int ConfirmationCode { get; set; }
    }
}
