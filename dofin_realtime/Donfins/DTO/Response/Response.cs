using System.Net;
using Dofins.Models;

namespace Dofins.DTO.Response
{
    public class Response<T>
    {
        public HttpStatusCode Status  { get; set; }
        public string Message { get; set; }
        public List<T> Data { get; set; }


        public Response(HttpStatusCode Status, string Message, List<T> Data)
        {
            this.Status = Status;
            this.Message = Message;
            this.Data = Data;
        }
    }
}
