using System.Numerics;

namespace Dofins.Models
{
    public class MarketInfoChanges
    {
        public MarketInfoChanges() { }

        public long id { get; set;  }
        public string Exchange { get; set; }

        public string IndexName
        {
            get
            {
                if (this.Exchange == "HOSTC")
                    return "VN-INDEX";
                if (this.Exchange == "HASTC")
                    return "HNX-INDEX";
                return !(this.Exchange == "UPCOM") ? this.Exchange : "UP-INDEX";
            }
        }

        public DateTime? Date { get; set; }

        public int? Minutes { get; set; }

        public string Status { get; set; }

        public double? TotalTrade { get; set; }

        public double? TotalValue { get; set; }

        public double? TotalVolume { get; set; }

        public double? PTVolume { get; set; }

        public double? PTValue { get; set; }

        public double? IndexCurrent { get; set; }

        public double? IndexBasic { get; set; }

        public double? IndexHigh { get; set; }

        public double? IndexLow { get; set; }

        public double? IndexCeiling { get; set; }

        public double? IndexFloor { get; set; }

        public double? Index1 { get; set; }

        public double? TotalTrade1 { get; set; }

        public double? TotalValue1 { get; set; }

        public double? TotalVolume1 { get; set; }

        public double? Index2 { get; set; }

        public double? TotalTrade2 { get; set; }

        public double? TotalValue2 { get; set; }

        public double? TotalVolume2 { get; set; }

        public double? Index3 { get; set; }

        public double? TotalTrade3 { get; set; }

        public double? TotalValue3 { get; set; }

        public double? TotalVolume3 { get; set; }

        public double? BuyForeignQuantity { get; set; }

        public double? SellForeignQuantity { get; set; }

        public double? BuyForeignValue { get; set; }

        public double? SellForeignValue { get; set; }

        public int? Advances { get; set; }

        public int? Declines { get; set; }

        public int? Unchange { get; set; }

        public int? Traded { get; set; }

        public int? Untraded { get; set; }

        public double? AdvancesValue { get; set; }

        public double? DeclinesValue { get; set; }

        public double? UnchangeValue { get; set; }

        public double? PriceBid1 { get; set; }

        public double? QuantityBid1 { get; set; }

        public double? PriceBid2 { get; set; }

        public double? QuantityBid2 { get; set; }

        public double? PriceBid3 { get; set; }

        public double? QuantityBid3 { get; set; }

        public double? PriceAsk1 { get; set; }

        public double? QuantityAsk1 { get; set; }

        public double? PriceAsk2 { get; set; }

        public double? QuantityAsk2 { get; set; }

        public double? PriceAsk3 { get; set; }

        public double? QuantityAsk3 { get; set; }
    }

    
}
