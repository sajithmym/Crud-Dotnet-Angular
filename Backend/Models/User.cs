using System.ComponentModel.DataAnnotations.Schema;

namespace Crud_api.Models
{
    [Table("user")]
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; } // Marked as nullable
        public string? Email { get; set; } // Marked as nullable
        public string? Password { get; set; } // Marked as nullable
    }
}