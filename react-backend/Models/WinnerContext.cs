using Microsoft.EntityFrameworkCore;

namespace react_backend.Models
{
    public class WinnerContext : DbContext
    {
        public WinnerContext(DbContextOptions<WinnerContext> options)
        : base(options)
        {
        }

        public DbSet<Winner> Winners { get; set; } = null!;
    }
}
