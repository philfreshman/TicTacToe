using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using react_backend.Models;
using Microsoft.AspNetCore.Cors;


namespace react_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("MyPolicy")]

    public class GameWinnersController : ControllerBase
    {
        private readonly GameWinnerContext _context;

        public GameWinnersController(GameWinnerContext context)
        {
            _context = context;
        }


        // GET: api/GameWinners
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameWinner>>> GetGameWinners()
        {
            return await _context.GameWinners.ToListAsync();
        }


        // GET: api/GameWinners/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameWinner>> GetGameWinner(int id)
        {
            var gameWinner = await _context.GameWinners.FindAsync(id);

            if (gameWinner == null)
            {
                return NotFound();
            }

            return gameWinner;
        }


        // POST: api/GameWinners
        [HttpPost]
        public async Task<ActionResult<GameWinner>> PostGameWinner(GameWinner gameWinner)
        {
            _context.GameWinners.Add(gameWinner);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGameWinner", new { id = gameWinner.Id }, gameWinner);
        }
    }
}
