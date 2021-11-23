namespace react_backend.Models
{
    public class GameWinner
    {
        public int Id { get; set; }
        public string? Winner { get; set; }
        public int Round { get; set; }
        public long Time { get; set; }
    }
}
