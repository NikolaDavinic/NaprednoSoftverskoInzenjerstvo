using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DTO.TagDTOs;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("tags")]
    public class TagController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<TagController> logger;

        public TagController(ILogger<TagController> _logger, TimeTrackerDbContext _context)
        {
            this.context = _context;
            this.logger = _logger;
        }

        #region GET

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetAllTags()
        {
            var tags = await context.Tags.ToListAsync();

            if(tags == null)
            {
                return NotFound("There are no tags at this moment!");
            }

            return Ok(tags);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetTagById(int id)
        {
            var tagById = await context.Tags.Where(tag => tag.Id == id).FirstOrDefaultAsync();

            if(tagById == null)
            {
                return NotFound("Tag with this id not exist!");
            }

            return Ok(tagById);
        }

        [HttpGet]
        [Route("activeTags")]
        public async Task<ActionResult> GetActiveTags()
        {
            var tags = await context.Tags.Where(tag => tag.IsArchived == false).ToListAsync();

            if(tags == null)
            {
                return BadRequest("There are no active tags!");
            }

            return Ok(tags);
        }

        [HttpGet]
        [Route("acrhivedTags")]
        public async Task<ActionResult> GetArchivedTags()
        {
            var tags = await context.Tags.Where(tag => tag.IsArchived == true).ToListAsync();

            if (tags == null)
            {
                return BadRequest("There are no archived tags!");
            }

            return Ok(tags);
        }

        #endregion

        #region POST

        [HttpPost]
        [Route("")]
        public async Task<ActionResult> CreateTag([FromBody] AddTagDTO tagBody)
        {
            try
            {
                if(tagBody == null)
                {
                    return BadRequest("Invalid parameters");
                }

                Tag tag = new Tag();
                tag.Name = tagBody.Name;

                context.Add(tag);
                await context.SaveChangesAsync();

                return Ok(tag);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region PUT

        [HttpPut]
        [Route("")]
        public async Task<ActionResult> ChangeTag([FromBody] EditTagDTO tagBody)
        {
            try
            {
                if (tagBody == null)
                {
                    return BadRequest("Invalid parameters!");
                }

                var tagForChange = await context.Tags.Where(tag => tag.Id == tagBody.Id).FirstOrDefaultAsync();

                if (tagForChange == null)
                {
                    return NotFound("Tag with this id does not exist!");
                }

                tagForChange.Name = tagBody.Name;

                context.Update(tagForChange);
                await context.SaveChangesAsync();

                return Ok(tagForChange);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("archiveTag/{id}")]
        public async Task<ActionResult> ArchiveTag(int id)
        {
            try
            {
                var tag = await context.Tags.Where(t => t.Id == id).FirstOrDefaultAsync();

                if (tag == null)
                {
                    return NotFound("Tag with this id does not exist!");
                }

                tag.IsArchived = true;

                context.Update(tag);
                await context.SaveChangesAsync();

                return Ok(tag);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("activateTag/{id}")]
        public async Task<ActionResult> ActivateTag(int id)
        {
            try
            {
                var tag = await context.Tags.Where(t => t.Id == id).FirstOrDefaultAsync();

                if (tag == null)
                {
                    return NotFound("Tag with this id does not exist!");
                }

                tag.IsArchived = false;

                context.Update(tag);
                await context.SaveChangesAsync();

                return Ok(tag);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region DELETE

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteTag(int id)
        {
            try
            {
                var tag = await context.Tags.Where(t => t.Id == id).FirstOrDefaultAsync();

                if (tag == null)
                {
                    return NotFound("Tag with this id does not exist!");
                }

                context.Remove(tag);
                await context.SaveChangesAsync();

                return Ok("Tag succesfully deleted!");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

    }
}
