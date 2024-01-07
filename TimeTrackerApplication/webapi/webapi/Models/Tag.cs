
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Tag
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Name { get; set; } = string.Empty;

        public bool IsArchived { get; set; } = false;

        public List<TimeRecord>? RecordingTimes { get; set; } = new List<TimeRecord>();
    }
}
