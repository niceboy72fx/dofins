using Dofins.Models;
using Microsoft.EntityFrameworkCore;


namespace Dofins.Context
{
    public class HandleDbContext: DbContext
    {
        public HandleDbContext() { }

        public HandleDbContext(DbContextOptions<HandleDbContext> options) : base(options) { }

        public DbSet<IntradayQuote> intradayQuotes { get; set; }
        public DbSet<MarketInfoChanges> marketInfo { get; set; }
        public DbSet<QuoteChanges> quoteChanges { get; set; }
        public DbSet<Tickers> tickers { get; set; }
        public DbSet<DailyInfor > dailyInfors { get; set; } 

    }
}
