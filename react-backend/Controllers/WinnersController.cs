using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_backend.Models;
using Microsoft.AspNetCore.Cors;

namespace react_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]
    public class WinnersController : ControllerBase
    {
        private readonly WinnerContext _context;

        public WinnersController(WinnerContext context)
        {
            _context = context;
        }

        // GET: api/Winners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Winner>>> GetWinners()
        {
            return await _context.Winners.ToListAsync();
        }



        // POST: api/Winners
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Winner>> PostWinner(Winner winner)
        {
            _context.Winners.Add(winner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWinner", new { id = winner.Id }, winner);
        }

    }
}
