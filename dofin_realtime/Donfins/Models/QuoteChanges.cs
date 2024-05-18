namespace Dofins.Models
{
    public class QuoteChanges
    {
        public long ID { get; set; }
        public DateTime? Date { get; set; } // important
        public string Symbol { get; set; } // important
        public string Name { get; set; }
        public string Type { get; set; }
        public string Exchange { get; set; } 
        public double? PriceBasic { get; set; }
        public double? PriceCeiling { get; set; }
        public double? PriceFloor { get; set; }
        public double? PriceCurrent { get; set; } // important
        public double? PriceLast { get; set; }
        public double? PriceHigh { get; set; } // important
        public double? PriceLow { get; set; } // important
        public double? PriceOpen { get; set; } // important
        public double? PriceClose { get; set; } // important
        public double? PriceAverage { get; set; } // important
        public double? TotalVolume { get; set; } // important
        public double? Volume { get; set; }
        public double? TotalTrade { get; set; }
        public double? TotalValue { get; set; }
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
        public double? BuyCount { get; set; }
        public double? SellCount { get; set; }
        public double? BuyQuantity { get; set; }
        public double? SellQuantity { get; set; }
        public double? BuyForeignQuantity { get; set; }
        public double? SellForeignQuantity { get; set; }
        public double? BuyForeignValue { get; set; }
        public double? SellForeignValue { get; set; }
        public double? CurrentForeignRoom { get; set; }
        public double? TotalActiveBuyVolume { get; set; }
        public double? TotalActiveSellVolume { get; set; }
        public double? PricePercentChange { get; set; }
        public double? PriceChange { get; set; }
    }
}
