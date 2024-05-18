namespace Dofins.Models
{
    public class IntradayQuote
    {
        public IntradayQuote() { }
        
        public int ID { get; set; }
        public string Symbol { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
        public double Volume { get; set; }
        public double TotalVolume { get; set; }
        public string Side { get; set; }

        public IntradayQuote(int id, string symbol, DateTime date, double price, double volume, double totalVolume, string side)
        {
            this.ID = id;
            this.Symbol = symbol;
            this.Date = date;
            this.Price = price;
            this.Volume = volume;
            this.TotalVolume = totalVolume;
            this.Side = side;
        }
    }
}
