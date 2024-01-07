using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class TimeTrackerDbContext : DbContext
    {
        public TimeTrackerDbContext(DbContextOptions<TimeTrackerDbContext> options) : base(options) 
        {
        }

        public DbSet<Client> Clients { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<ProjectTask> ProjectTasks { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<TimeRecord> TimeRecords { get; set; }

        public DbSet<User> Users { get; set; }

    }
}
