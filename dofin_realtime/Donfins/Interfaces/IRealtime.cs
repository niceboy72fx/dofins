using System.Net.WebSockets;
using Dofins.DTO.Response;
using Dofins.Models;
using Newtonsoft.Json;

namespace Dofins.Interfaces
{
    public interface IRealtime
    {
        Task<ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>> FireAnt(String token);
        Task<string> FireAntTest(string token, WebSocket ws);


    }
}
