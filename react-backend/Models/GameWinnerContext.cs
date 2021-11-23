using Microsoft.EntityFrameworkCore;

namespace react_backend.Models
{
    public class GameWinnerContext : DbContext
    {
        public GameWinnerContext(DbContextOptions<GameWinnerContext> options)
        : base(options)
        {
        }

        public DbSet<GameWinner> GameWinners { get; set; } = null!;
    }
}
