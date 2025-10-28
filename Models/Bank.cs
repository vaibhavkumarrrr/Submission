namespace AMSSystem.Models
{
    public class Bank : BaseEntity<long>
    {
        public int BankId { get; set; }
        public int BranchId { get; set; }
        public string BankName { get; set; } = string.Empty;

        public int BankType { get; set; }

        public Branch branch { get; set; } = new Branch();

        public List<Branch> Branches { get; set; }


    }
}
