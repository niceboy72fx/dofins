namespace Dofins.DTO.Request
{
    public class IntradayForm
    {
        public int ID { get; set; }
        public string Symbol { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public double Volume { get; set; }
        public double TotalVolume { get; set; }
        public string Side { get; set; }
    }
}
