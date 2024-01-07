using Microsoft.AspNetCore.Mvc;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("timeRecords")]
    public class TimeRecordController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<TimeRecordController> logger;

        public TimeRecordController(ILogger<TimeRecordController> _logger, TimeTrackerDbContext _context)
        {
            this.logger = _logger;
            this.context = _context;
        }
    }
}
