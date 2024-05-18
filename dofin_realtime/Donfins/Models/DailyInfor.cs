using System.Numerics;

namespace Dofins.Models
{
    public class DailyInfor
    {
        public long ID { get; set; }
        public Tickers tickers { get; set; }
        public DateTime Date { get; set; }
        public BigInteger ShareOutStanding { get; set; }
        public BigInteger FreeShare { get; set; }   
        public BigInteger MarketCap { get; set; }
        public double High { get; set; }
        public double Low { get; set; }
        public double Open { get; set; }
        public double Close { get; set; }
        public double Average { get; set; }
        public BigInteger Volume { get; set; }
    }


}
