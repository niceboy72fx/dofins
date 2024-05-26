using Microsoft.AspNetCore.SignalR.Client;
using Newtonsoft.Json;
using System.Net;
using Dofins.DTO.Response;
using Dofins.Interfaces;
using Dofins.Models;
using System.Net.WebSockets;
using System.Text;

namespace Dofins.Services
{
    public class TestServices : ITest
    {

        List<QuoteChanges> quoteChanges = new List<QuoteChanges> { };
        List<MarketInfoChanges> marketInforChange = new List<MarketInfoChanges> { };
        List<IntradayQuote> intradayQuote = new List<IntradayQuote> { };

        public async Task<string> FireAntMorkTest(WebSocket ws)
        {
            List<QuoteChanges> _quoteChanges = new List<QuoteChanges>();
            List<MarketInfoChanges> _marketInfoChanges = new List<MarketInfoChanges>();
            List<IntradayQuote> _intradayQuote = new List<IntradayQuote>();


            var serverUrl = "http://116.111.118.183:5000/hub";

            var _chatHubProxy = new HubConnectionBuilder()
                .WithUrl(serverUrl)
                .Build();
            _chatHubProxy.On<List<QuoteChanges>>("updateQuote", messageIR =>
            {
                if (messageIR != null)
                {
                    _quoteChanges = messageIR;
                }
            });


            try
            {
                await _chatHubProxy.StartAsync();
            }
            catch (Exception ex)
            {
                return $"Token's expired! {ex.Message}";
            }

            while (true)
            {
                if (ws.State == WebSocketState.Closed || ws.State == WebSocketState.Aborted)
                {
                    break;
                }

                if (_quoteChanges.Count > 0 || _marketInfoChanges.Count > 0 || _intradayQuote.Count > 0)
                {
                    var response = new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(
                        HttpStatusCode.OK, "FireAnt's RealTime", _quoteChanges, _marketInfoChanges, _intradayQuote);

                    var message = JsonConvert.SerializeObject(response);
                    var bytes = Encoding.UTF8.GetBytes(message);
                    var arraySegment = new ArraySegment<byte>(bytes, 0, bytes.Length);

                    if (ws.State == WebSocketState.Open)
                    {
                        await ws.SendAsync(arraySegment, WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    _quoteChanges.Clear();
                    _marketInfoChanges.Clear();
                    _intradayQuote.Clear();
                }

                await Task.Delay(400);
            }
            return "WebSocket closed";
        }


    }
}
