
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class TimeRecord
    {
        [Key]
        public int Id { get; set; }

        public Project? Project { get; set; }

        [MaxLength(100)]
        public string? Description { get; set; }

        public ProjectTask? ProjectTask { get; set; }

        [Required]
        public DateTime DateOfRecord { get; set; }

        public Tag? Tag { get; set; }

        [Required]
        public int RecordingTime { get; set; }

    }
}
