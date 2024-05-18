namespace Dofins.Models
{
    public class Tickers
    {
        public long Id { get; set; }
        public string Symbol { get; set; }
        public string Company {  get; set; }
        public string Exchange { get; set; }
        public string Industry {  get; set; }
        public string RiskGroup { get; set; }
        public string StockSize { get; set; }
        public string PiorityLevel { get; set; }
        public float AdjustmentCoefficent { get; set;}
    }


}
