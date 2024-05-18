using Microsoft.AspNet.SignalR.Client;
using Newtonsoft.Json;
using System.Net;
using Dofins.DTO.Response;
using Dofins.Interfaces;
using Dofins.Models;
using Dofins.Context;

namespace Dofins.Services
{
    public class RealtimeServices : IRealtime
    {


        public async Task<ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>> FireAnt(String token)
        {
            List<QuoteChanges> quoteChanges = new List<QuoteChanges> { };
            List<MarketInfoChanges> marketInforChange = new List<MarketInfoChanges> { };
            List<IntradayQuote> intradayQuote = new List<IntradayQuote> { };
            var hubConnection = new HubConnection("https://www.fireant.vn/", $"Token {token}");
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
                return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "Couldn't fetching !" + ex, null, null, null);
            }
            try
            {
                await hubConnection.Start();
            } catch (Exception ex)
            {
                return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "Couldn't fetching !" + ex, null, null, null);
            }
            if ( quoteChanges.Count > 0 || marketInforChange.Count > 0 || intradayQuote.Count > 0) {
                return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, "FireAnt's RealTime", quoteChanges, marketInforChange, intradayQuote);
            } else
            {
                return new ResponseAll<QuoteChanges, MarketInfoChanges, IntradayQuote>(HttpStatusCode.OK, null, quoteChanges, marketInforChange, intradayQuote);
            }
        }
    }
}
