namespace AMSSystem.Models
{
    public abstract class BaseEntity
    {
        public int? CreatedBy { get; set; }
        public int? ModifiedBy { get; set; }

        public DateTime? CreatedOn { get; set; } = DateTime.UtcNow;

        public DateTime? ModifiedOn { get; set; }

        
    }
}


