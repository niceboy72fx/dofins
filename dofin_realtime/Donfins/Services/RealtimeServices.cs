using Microsoft.AspNet.SignalR.Client;
using Newtonsoft.Json;
using System.Net;
using Dofins.DTO.Response;
using Dofins.Interfaces;
using Dofins.Models;
using System.Net.WebSockets;
using System.Text;

namespace Dofins.Services
{
    public class RealtimeServices : IRealtime
    {

        private readonly IAuthentication _authen;
        List<QuoteChanges> quoteChanges = new List<QuoteChanges> { };
        List<MarketInfoChanges> marketInforChange = new List<MarketInfoChanges> { };
        List<IntradayQuote> intradayQuote = new List<IntradayQuote> { };

        public RealtimeServices(IAuthentication authentication)
        {
            _authen = authentication;
        }

        public async Task<ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>> FireAnt(String token)
        {

            String retryToken = token;
            var hubConnection = new HubConnection("https://www.fireant.vn/", $"Token {retryToken}");
            //  hubConnection.TraceLevel = TraceLevels.All;
            //  hubConnection.TraceWriter = Console.Out;
            ServicePointManager.DefaultConnectionLimit = 200;
            IHubProxy chatHubProxy = hubConnection.CreateHubProxy("AppQuoteHub");
            try
            {
                chatHubProxy.On("updateQuote", messageIR =>
                {
                    if (messageIR != null)
                    {
                        List<QuoteChanges> stocks = JsonConvert.DeserializeObject<List<QuoteChanges>>(messageIR.ToString());
                        quoteChanges = stocks;
                    }
                    else
                    {
                        Console.WriteLine("Received empty message.");
                    }
                });
                chatHubProxy.On("updateMarket", messageIR =>
                {
                    if (messageIR != null)
                    {
                        List<MarketInfoChanges> stocks = JsonConvert.DeserializeObject<List<MarketInfoChanges>>(messageIR.ToString());
                        marketInforChange = stocks;
                    }
                    else
                    {
                        Console.WriteLine("Received empty message.");
                    }
                });
                chatHubProxy.On("updateIntradayQuote", messageIR =>
                {
                    if (messageIR != null)
                    {
                        List<IntradayQuote> stocks = JsonConvert.DeserializeObject<List<IntradayQuote>>(messageIR.ToString());
                        intradayQuote = stocks;
                    }
                    else
                    {
                        Console.WriteLine("Received empty message.");
                    }
                });


            }
            catch (Exception ex)
            {
                // hubConnection.Start();
                return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "Couldn't fetching !" + ex, null, null, null);
            }
            try
            {
                await hubConnection.Start();
            }
            catch (Exception ex)
            {
                retryToken = await _authen.GetTokenFireAnt();
                hubConnection.Start();
                return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "Token's expired !" + ex, null, null, null);
            }
            // if ( quoteChanges.Count > 0 || marketInforChange.Count > 0 || intradayQuote.Count > 0) {
            //     return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "FireAnt's RealTime", quoteChanges, marketInforChange, intradayQuote);
            // } else
            // {
            //     return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, null, quoteChanges, marketInforChange, intradayQuote);
            // }
            return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "FireAnt's RealTime", quoteChanges, marketInforChange, intradayQuote);
        }


        public async Task<string> FireAntTest(string token, WebSocket ws)
        {
            List<QuoteChanges> _quoteChanges = new List<QuoteChanges>();
            List<MarketInfoChanges> _marketInfoChanges = new List<MarketInfoChanges>();
            List<IntradayQuote> _intradayQuote = new List<IntradayQuote>();
            String retryToken = token;
            var _hubConnection = new HubConnection("https://www.fireant.vn/", $"Token {retryToken}");
            _hubConnection.TraceLevel = TraceLevels.All;
            _hubConnection.TraceWriter = Console.Out;
            ServicePointManager.DefaultConnectionLimit = 200;
            IHubProxy _chatHubProxy = _hubConnection.CreateHubProxy("AppQuoteHub");

            _chatHubProxy.On("updateQuote", messageIR =>
            {
                if (messageIR != null)
                {
                    var stocks = JsonConvert.DeserializeObject<List<QuoteChanges>>(messageIR.ToString());
                    _quoteChanges = stocks;
                }
            });

            _chatHubProxy.On("updateMarket", messageIR =>
            {
                if (messageIR != null)
                {
                    var stocks = JsonConvert.DeserializeObject<List<MarketInfoChanges>>(messageIR.ToString());
                    _marketInfoChanges = stocks;
                }
            });

            _chatHubProxy.On("updateIntradayQuote", messageIR =>
            {
                if (messageIR != null)
                {
                    var stocks = JsonConvert.DeserializeObject<List<IntradayQuote>>(messageIR.ToString());
                    _intradayQuote = stocks;
                }
            });

            try
            {
                await _hubConnection.Start();
            }
            catch (Exception ex)
            {
                retryToken = await _authen.GetTokenFireAnt();
                _hubConnection.Start();
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
