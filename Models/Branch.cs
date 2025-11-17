namespace AMSSystem.Models
{
    public class Branch:BaseEntity
    {
        public int BranchId { get; set; }

        public string BranchName {  get; set; } = string.Empty;
        public string BranchPincode { get; set; }=string.Empty;
        public string BranchStatus { get; set; } = string.Empty;

    }
}
