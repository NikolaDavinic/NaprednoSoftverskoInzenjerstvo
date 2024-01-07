using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DTO.ClientDTOs;
using webapi.Models;

namespace webapi.Controllers
{
    [ApiController]
    [Route("clients")]
    public class ClientController : Controller
    {
        public TimeTrackerDbContext context { get; set; }
        private readonly ILogger<ClientController> logger;

        public ClientController(ILogger<ClientController> _logger, TimeTrackerDbContext _context)
        {
            logger = _logger;
            context = _context;
        }

        #region GET

        [HttpGet]
        [Route("")]
        public async Task<ActionResult> GetAllClients()
        {
            var clients = await context.Clients.ToListAsync();
            
            if(clients == null)
            {
                return NotFound();
            }

            return Ok(clients);
        }

        [HttpGet]
        [Route("archived")]
        public async Task<ActionResult> GetArchivedClients()
        {
            var archivedClient = await context.Clients.Where(client => client.IsArchived == true).ToListAsync();

            if(archivedClient == null)
            {
                return NotFound();
            }

            return Ok(archivedClient);
        }

        [HttpGet]
        [Route("active")]
        public async Task<ActionResult> GetActiveClients()
        {
            var activeClients = await context.Clients.Where(client => client.IsArchived == false).ToListAsync();

            if(activeClients == null)
            {
                return NotFound();
            }

            return Ok(activeClients);
        }

        [HttpGet]
        [Route("filteredByName/{pattern}")]
        public async Task<ActionResult> GetClientsFilteredByName(string pattern)
        {
            var filteredClients = await context.Clients.Where(client => client.Name.Contains(pattern)).ToListAsync();

            if(filteredClients == null)
            {
                return NotFound();
            }

            return Ok(filteredClients);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetClientById(int id)
        {
            var clientById = await context.Clients.Where(client => client.Id == id).FirstOrDefaultAsync();

            if(clientById == null)
            {
                return NotFound("Client with this id not exist!");
            }

            return Ok(clientById);
        }

        #endregion

        #region POST

        [HttpPost]
        [Route("")]
        public async Task<ActionResult> AddClient([FromBody] AddClientDTO clientBody)
        {
            try
            {
                var testClient = await context.Clients.Where(client => client.Name == clientBody.Name).FirstOrDefaultAsync();

                if(clientBody == null || testClient != null)
                {
                    return BadRequest("Invalid parameters or user with this name already exist!");
                }

                Client client = new Client();
                client.Name = clientBody.Name;
                client.IsArchived = false;
                client.Address = string.Empty;
                client.Email = string.Empty;
                client.Note = string.Empty;

                context.Clients.Add(client);
                await context.SaveChangesAsync();

                return Ok(client);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        #endregion

        #region PUT

        [HttpPut]
        [Route("changeStatus/{clientId}")]
        public async Task<ActionResult> ChangeClientStatus(int clientId)
        {
            try
            {
                var clientForChange = await context.Clients.Where(client => client.Id == clientId).FirstOrDefaultAsync();

                if (clientForChange == null)
                {
                    return NotFound("Element not exist!");
                }

                Console.WriteLine(clientForChange.IsArchived);
                clientForChange.IsArchived = !clientForChange.IsArchived;
                Console.WriteLine(clientForChange.IsArchived);

                context.Clients.Update(clientForChange);
                await context.SaveChangesAsync();

                return Ok(clientForChange);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPut]
        [Route("")]
        public async Task<ActionResult> EditClient([FromBody] EditClientDTO clientBody)
        {
            try
            {
                if (clientBody == null)
                {
                    return BadRequest("Invalid data!");
                }

                var clientForChange = await context.Clients.Where(client => client.Id == clientBody.Id).FirstOrDefaultAsync();

                if(clientForChange == null)
                {
                    return NotFound("Client with this id not exist!");
                }

                clientForChange.Name = clientBody.Name;
                clientForChange.Email = clientBody.Email;
                clientForChange.Address = clientBody.Address;
                clientForChange.Note = clientBody.Note;
                context.Clients.Update(clientForChange);
                await context.SaveChangesAsync();

                return Ok(clientForChange);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region DELETE

        //morace da se zameni kada dodam za projekte jer mora i tamo da se obrise isto
        [HttpDelete]
        [Route("")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            try
            {
                var client = await context.Clients.Where(client => client.Id == id).FirstOrDefaultAsync();

                if(client == null)
                {
                    return NotFound("Client with this id don't exist");
                }

                context.Clients.Remove(client);
                await context.SaveChangesAsync();

                return Ok("User successfully deleted!");
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

    }
}
