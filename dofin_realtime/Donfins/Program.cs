using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using Dofins.Interfaces;
using Dofins.Models;
using Dofins.Services;
using Dofins.Context;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.WebHost.UseUrls("http://0.0.0.0:4000");

builder.Services.AddSingleton<IAuthentication, AuthenticationServices>();

builder.Services.AddSingleton<IRealtime, RealtimeServices>();


var app = builder.Build();

app.UseWebSockets();


app.Map("/fireAnt", async context =>
{

    if (context.WebSockets.IsWebSocketRequest)
    {
        using var ws = await context.WebSockets.AcceptWebSocketAsync();
        var authenticationServices = app.Services.GetRequiredService<IAuthentication>();
        var realtimeServices = app.Services.GetRequiredService<IRealtime>();
        String token = await authenticationServices.GetTokenFireAnt();
        if (string.IsNullOrEmpty(token))
        {
            Console.WriteLine("Failed to retrieve token.");
        }
        else
        {
            var stockServices = await realtimeServices.FireAnt(token);
            while (true)
            {
                if (stockServices.Message != null) {
                    var message = Newtonsoft.Json.JsonConvert.SerializeObject(stockServices);
                    var bytes = Encoding.UTF8.GetBytes(message);
                    var arraySegment = new ArraySegment<byte>(bytes, 0, bytes.Length);
                    if (ws.State == System.Net.WebSockets.WebSocketState.Open)
                    {
                        await ws.SendAsync(arraySegment, System.Net.WebSockets.WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else if (ws.State == System.Net.WebSockets.WebSocketState.Closed || ws.State == System.Net.WebSockets.WebSocketState.Aborted)
                    {
                        break;
                    }
                }               
                await Task.Delay(400);
            }
        }
    }
    else
    {
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
    }
});


await app.RunAsync();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
