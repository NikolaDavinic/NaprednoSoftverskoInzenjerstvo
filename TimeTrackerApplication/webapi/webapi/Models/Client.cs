
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Client
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Name { get; set; }

        [MaxLength(50)]
        public string? Email { get; set; }

        [MaxLength(40)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? Note { get; set; }

        public bool IsArchived { get; set; }

        public List<Project>? Projects { get; set; } = new List<Project>();
    }
}
