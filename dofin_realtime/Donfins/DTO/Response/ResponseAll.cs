using System.Net;
using Dofins.Models;

namespace Dofins.DTO.Response
{
    public class ResponseAll<T1,T2,T3>
    {
        public HttpStatusCode Status { get; set; }
        public string Message { get; set; }
        public List<T1> UpdateQuote { get; set; }
        public List<T2> UpdateMarket { get; set; }
        public List<T3> UpdateIntradayQuote { get; set; }
        public ResponseAll(HttpStatusCode status, string message, List<T1> updateQuote, List<T2> updateMarket, List<T3> updateIntradayQuote)
        {

            this.Status = status;
            this.Message = message;
            this.UpdateQuote = updateQuote;
            this.UpdateMarket = updateMarket;
            this.UpdateIntradayQuote = updateIntradayQuote;
        }

 
    }

}
