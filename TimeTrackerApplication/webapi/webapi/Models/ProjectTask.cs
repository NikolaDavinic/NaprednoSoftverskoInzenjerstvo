
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class ProjectTask
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(40)]
        public string Title { get; set; }

        public bool IsDone { get; set; }

        public Project Project { get; set; }

        public List<TimeRecord>? RecordingTimes { get; set; }

        //public List<User> AssignedUsers { get; set; }
    }
}
