using System.Net.WebSockets;
using Dofins.DTO.Response;
using Dofins.Models;
using Newtonsoft.Json;

namespace Dofins.Interfaces
{
    public interface ITest
    {
        Task<string> FireAntMorkTest(WebSocket ws);

    }
}
