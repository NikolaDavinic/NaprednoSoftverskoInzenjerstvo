

using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public User User { get; set; }

        [Required]
        [MaxLength(40)]
        public string Name { get; set; }

        public string? Description { get; set; }

        public bool IsArchived { get; set; }

        public Client? Client { get; set; }

        public bool IsFavourite { get; set; }

        public List<ProjectTask>? Tasks { get; set; }

        public bool IsBillable { get; set; }

        [Required]
        public int BillablePerHour { get; set; }

        public List<TimeRecord>? RecordingTimes { get; set; }

        //public List<User> Users { get; set; } = new List<User>();
    }
}
