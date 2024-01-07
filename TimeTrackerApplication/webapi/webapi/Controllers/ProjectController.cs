using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("projects")]
    public class ProjectController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<ProjectController> logger;

        public ProjectController(ILogger<ProjectController> _logger, TimeTrackerDbContext _context)
        {
            this.logger = _logger;
            this.context = _context;
        }

        #region GET

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetAllProjects()
        {
            var projects = await context.Projects.ToListAsync();
            
            if(projects == null)
            {
                return NotFound("No projects exists!");
            }

            return Ok(projects);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetProjectById(int id)
        {
            var project = await context.Projects.Where(p => p.Id == id).FirstOrDefaultAsync();

            if(project == null)
            {
                return NotFound("Project with this id does not exist!");
            }

            return Ok(project);
        }

        #endregion

    }
}
